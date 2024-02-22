import React, { useCallback, RefObject, useRef, ReactElement, ReactNode } from 'react';
import { ScrollView, View, ViewStyle, Platform } from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../helpers/scrollToNewlyfocusedElement';
import { useDevice } from '../context/DeviceContext';
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
  topArrow?: ReactNode;
  bottomArrow?: ReactElement;
  topArrowContainerStyle?: ViewStyle;
  bottomArrowContainerStyle?: ViewStyle;
  /** Number of pixels scrolled every 10ms */
  scrollSpeed?: number;
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
  scrollSpeed = 10,
}: Props) => {
  const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
    useSpatialNavigatorParentScroll();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    deviceType,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId,
  } = useDevice();
  const scrollY = useRef<number>(0);

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

  const onMouseEnterTop = () => {
    if (deviceType === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        currentScrollPosition -= scrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  };

  const onMouseEnterBottom = () => {
    if (deviceType === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        // console.log('scrolling bottom', id);
        currentScrollPosition += scrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  };

  const onMouseLeave = () => {
    if (deviceType === 'remotePointer') {
      const intervalId = getScrollingId();
      if (intervalId) {
        clearInterval(intervalId);
        setScrollingId(null);
      }
    }
  };

  const webProps = (onMouseEnter: () => void) => {
    return Platform.select({
      web: {
        onMouseEnter,
        onMouseLeave: onMouseLeave,
      },
      default: {},
    });
  };

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
        <>
          <TopArrowContainer style={topArrowContainerStyle} {...webProps(onMouseEnterTop)}>
            {topArrow}
          </TopArrowContainer>
          <View style={bottomArrowContainerStyle} {...webProps(onMouseEnterBottom)}>
            {bottomArrow}
          </View>
        </>
      ) : undefined}
    </SpatialNavigatorParentScrollContext.Provider>
  );
};

const TopArrowContainer = styled.View({
  position: 'absolute',
});
