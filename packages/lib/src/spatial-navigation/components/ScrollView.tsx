import React, { useCallback, RefObject, useRef, ReactElement, ReactNode, useMemo } from 'react';
import { ScrollView, View, ViewStyle, Platform } from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../helpers/scrollToNewlyfocusedElement';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';
import styled from '@emotion/native';

type Props = {
  horizontal?: boolean;
  /**
   * Use this offset to prevent the element from sticking too closely to the edges of the screen during scrolling.
   * This is a margin in pixels.
   */
  offsetFromStart?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  /** Arrow that will show up only when web cursor pointer is active  */
  topArrow?: ReactNode;
  /** Arrow that will show up only when web cursor pointer is active  */
  bottomArrow?: ReactElement;
  /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
  topArrowContainerStyle?: ViewStyle;
  /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
  bottomArrowContainerStyle?: ViewStyle;
  /** Number of pixels scrolled every 10ms - only when using web cursor pointer to scroll */
  pointerScrollSpeed?: number;
};

const useRemotePointerScrollviewScrollProps = ({
  pointerScrollSpeed,
  scrollY,
  scrollViewRef,
}: {
  pointerScrollSpeed: number;
  scrollY: React.MutableRefObject<number>;
  scrollViewRef: React.MutableRefObject<ScrollView | null>;
}) => {
  const {
    deviceType,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId,
  } = useSpatialNavigationDeviceType();
  const onMouseEnterTop = useCallback(() => {
    if (deviceType === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        currentScrollPosition -= pointerScrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceType, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);

  const onMouseEnterBottom = useCallback(() => {
    if (deviceType === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        // console.log('scrolling bottom', id);
        currentScrollPosition += pointerScrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceType, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);

  const onMouseLeave = useCallback(() => {
    if (deviceType === 'remotePointer') {
      const intervalId = getScrollingId();
      if (intervalId) {
        clearInterval(intervalId);
        setScrollingId(null);
      }
    }
  }, [deviceType, getScrollingId, setScrollingId]);

  const webProps = useCallback(
    (onMouseEnter: () => void) => {
      return Platform.select({
        web: {
          onMouseEnter,
          onMouseLeave,
        },
        default: {},
      });
    },
    [onMouseLeave],
  );

  return { onMouseEnterTop, onMouseEnterBottom, webProps, deviceType };
};

export const SpatialNavigationScrollView = ({
  horizontal = false,
  style,
  offsetFromStart = 0,
  children,
  topArrow,
  bottomArrow,
  topArrowContainerStyle,
  bottomArrowContainerStyle,
  pointerScrollSpeed: pointerScrollSpeed = 10,
}: Props) => {
  const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
    useSpatialNavigatorParentScroll();
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollY = useRef<number>(0);

  const { onMouseEnterTop, onMouseEnterBottom, webProps, deviceType } =
    useRemotePointerScrollviewScrollProps({ pointerScrollSpeed, scrollY, scrollViewRef });

  const scrollToNode = useCallback(
    (newlyFocusedElementRef: RefObject<View>) => {
      try {
        if (deviceType === 'remoteKeys') {
          newlyFocusedElementRef?.current?.measureLayout(
            scrollViewRef?.current?.getInnerViewNode(),
            (left, top) =>
              scrollToNewlyFocusedElement({
                newlyFocusedElementDistanceToLeftRelativeToLayout: left,
                newlyFocusedElementDistanceToTopRelativeToLayout: top,
                horizontal,
                offsetFromStart,
                scrollViewRef,
              }),
            () => {},
          );
        }
      } catch {
        // A crash can happen when calling measureLayout when a page unmounts. No impact on focus detected in regular use cases.
      }
      makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef); // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
    },
    [makeParentsScrollToNodeIfNeeded, horizontal, offsetFromStart, deviceType],
  );

  return (
    <SpatialNavigatorParentScrollContext.Provider value={scrollToNode}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={horizontal}
        style={style}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        onScroll={(event) => {
          scrollY.current = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      {deviceType === 'remotePointer' ? (
        <PointerScrollArrows
          topArrow={topArrow}
          bottomArrow={bottomArrow}
          topArrowContainerStyle={topArrowContainerStyle}
          bottomArrowContainerStyle={bottomArrowContainerStyle}
          onMouseEnterTop={onMouseEnterTop}
          onMouseEnterBottom={onMouseEnterBottom}
          webProps={webProps}
        />
      ) : undefined}
    </SpatialNavigatorParentScrollContext.Provider>
  );
};

type WebProps = (onMouseEnter: () => void) =>
  | {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    }
  | {
      onMouseEnter?: undefined;
      onMouseLeave?: undefined;
    };

const PointerScrollArrows = React.memo(
  ({
    topArrow,
    bottomArrow,
    topArrowContainerStyle,
    bottomArrowContainerStyle,
    onMouseEnterTop,
    onMouseEnterBottom,
    webProps,
  }: {
    topArrow?: ReactNode;
    bottomArrow?: ReactElement;
    topArrowContainerStyle?: ViewStyle;
    bottomArrowContainerStyle?: ViewStyle;
    onMouseEnterTop: () => void;
    onMouseEnterBottom: () => void;
    webProps: WebProps;
  }) => {
    const TopArrowContainer = styled.View({
      position: 'absolute',
    });

    const onMouseEnterTopWebProps = useMemo(
      () => webProps(onMouseEnterTop),
      [webProps, onMouseEnterTop],
    );

    const onMouseEnterBottomWebProps = useMemo(
      () => webProps(onMouseEnterBottom),
      [webProps, onMouseEnterBottom],
    );

    return (
      <>
        <TopArrowContainer style={topArrowContainerStyle} {...onMouseEnterTopWebProps}>
          {topArrow}
        </TopArrowContainer>
        <View style={bottomArrowContainerStyle} {...onMouseEnterBottomWebProps}>
          {bottomArrow}
        </View>
      </>
    );
  },
);
PointerScrollArrows.displayName = 'PointerScrollArrows';
