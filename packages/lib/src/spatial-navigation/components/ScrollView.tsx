import React, { useCallback, RefObject, useRef, ReactElement, ReactNode, useMemo } from 'react';
import {
  ScrollView,
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../helpers/scrollToNewlyfocusedElement';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';

type Props = {
  horizontal?: boolean;
  /**
   * Use this offset to prevent the element from sticking too closely to the edges of the screen during scrolling.
   * This is a margin in pixels.
   */
  offsetFromStart?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  /** Arrow that will show up inside the arrowContainer */
  descendingArrow?: ReactElement;
  /** Arrow that will show up inside the arrowContainer */
  ascendingArrow?: ReactElement;
  /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
  descendingArrowContainerStyle?: ViewStyle;
  /** Style props for the arrow container, basically the area hoverable that triggers a scroll  */
  ascendingArrowContainerStyle?: ViewStyle;
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

  const ascendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: { onMouseEnter: onMouseEnterBottom, onMouseLeave: onMouseLeave },
      }),
    [onMouseEnterBottom, onMouseLeave],
  );

  const descendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: { onMouseEnter: onMouseEnterTop, onMouseLeave: onMouseLeave },
      }),
    [onMouseEnterTop, onMouseLeave],
  );

  return {
    deviceType,
    ascendingArrowProps,
    descendingArrowProps,
  };
};

export const SpatialNavigationScrollView = ({
  horizontal = false,
  style,
  offsetFromStart = 0,
  children,
  ascendingArrow,
  ascendingArrowContainerStyle,
  descendingArrow,
  descendingArrowContainerStyle,
  pointerScrollSpeed = 10,
}: Props) => {
  const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
    useSpatialNavigatorParentScroll();
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollY = useRef<number>(0);

  const { ascendingArrowProps, descendingArrowProps, deviceType } =
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

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.current = event.nativeEvent.contentOffset.y;
    },
    [scrollY],
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
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      {deviceType === 'remotePointer' ? (
        <PointerScrollArrows
          descendingArrow={descendingArrow}
          ascendingArrow={ascendingArrow}
          descendingArrowContainerStyle={descendingArrowContainerStyle}
          ascendingArrowContainerStyle={ascendingArrowContainerStyle}
          ascendingArrowProps={ascendingArrowProps}
          descendingArrowProps={descendingArrowProps}
        />
      ) : undefined}
    </SpatialNavigatorParentScrollContext.Provider>
  );
};

const PointerScrollArrows = React.memo(
  ({
    ascendingArrow,
    descendingArrowProps,
    ascendingArrowContainerStyle,
    descendingArrow,
    ascendingArrowProps,
    descendingArrowContainerStyle,
  }: {
    ascendingArrow?: ReactElement;
    ascendingArrowProps?: {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    ascendingArrowContainerStyle?: ViewStyle;
    descendingArrow?: ReactNode;
    descendingArrowProps?: {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    descendingArrowContainerStyle?: ViewStyle;
  }) => {
    return (
      <>
        <View
          style={[styles.arrowContainer, descendingArrowContainerStyle]}
          {...descendingArrowProps}
        >
          {descendingArrow}
        </View>
        <View style={ascendingArrowContainerStyle} {...ascendingArrowProps}>
          {ascendingArrow}
        </View>
      </>
    );
  },
);
PointerScrollArrows.displayName = 'PointerScrollArrows';

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
  },
});
