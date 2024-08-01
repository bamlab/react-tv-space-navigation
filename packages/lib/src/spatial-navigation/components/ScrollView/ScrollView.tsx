import React, { useCallback, RefObject, useRef, ReactElement, forwardRef } from 'react';
import { ScrollView, View, ViewStyle, Platform } from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../../helpers/scrollToNewlyfocusedElement';
import { mergeRefs } from '../../helpers/mergeRefs';
import { useRemotePointerScrollviewScrollProps } from './pointer/useRemotePointerScrollviewScrollProps';
import { PointerScrollArrows } from './pointer/PointerScrollArrows';
import { CustomScrollViewRef } from './types';
import { AnyScrollView } from './AnyScrollView';

type Props = {
  horizontal?: boolean;
  /**
   * Use this offset to prevent the element from sticking too closely to the edges of the screen during scrolling.
   * This is a margin in pixels.
   */
  offsetFromStart?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
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
  /** Toggles the native scrolling version of the scroll view instead of the CSS scroll */
  useNativeScroll?: boolean;
  /** Configures the scroll duration in the case of CSS scroll */
  scrollDuration?: number;
  testID?: string;
};

const getNodeRef = (node: CustomScrollViewRef | null | undefined) => {
  if (Platform.OS === 'web') {
    return node?.getInnerViewNode();
  }

  return node;
};

export const SpatialNavigationScrollView = forwardRef<ScrollView, Props>(
  (
    {
      horizontal = false,
      style,
      offsetFromStart = 0,
      children,
      ascendingArrow,
      ascendingArrowContainerStyle,
      descendingArrow,
      descendingArrowContainerStyle,
      pointerScrollSpeed = 10,
      contentContainerStyle,
      useNativeScroll = false,
      scrollDuration = 200,
      testID,
    },
    ref,
  ) => {
    const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
      useSpatialNavigatorParentScroll();
    const scrollViewRef = useRef<CustomScrollViewRef>(null);

    const scrollY = useRef<number>(0);

    const { ascendingArrowProps, descendingArrowProps, deviceType, deviceTypeRef } =
      useRemotePointerScrollviewScrollProps({ pointerScrollSpeed, scrollY, scrollViewRef });

    const scrollToNode = useCallback(
      (newlyFocusedElementRef: RefObject<View>, additionalOffset = 0) => {
        try {
          if (deviceTypeRef.current === 'remoteKeys') {
            newlyFocusedElementRef?.current?.measureLayout(
              getNodeRef(scrollViewRef?.current),
              (left, top) =>
                scrollToNewlyFocusedElement({
                  newlyFocusedElementDistanceToLeftRelativeToLayout: left,
                  newlyFocusedElementDistanceToTopRelativeToLayout: top,
                  horizontal,
                  offsetFromStart: offsetFromStart + additionalOffset,
                  scrollViewRef,
                }),
              () => {},
            );
          }
        } catch {
          // A crash can happen when calling measureLayout when a page unmounts. No impact on focus detected in regular use cases.
        }
        makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef, additionalOffset); // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
      },
      [makeParentsScrollToNodeIfNeeded, horizontal, offsetFromStart, deviceTypeRef],
    );

    const onScroll = useCallback(
      (event: { nativeEvent: { contentOffset: { y: number; x: number } } }) => {
        scrollY.current = event.nativeEvent.contentOffset.y;
      },
      [scrollY],
    );

    return (
      <SpatialNavigatorParentScrollContext.Provider value={scrollToNode}>
        <AnyScrollView
          useNativeScroll={useNativeScroll}
          scrollDuration={scrollDuration}
          ref={mergeRefs([ref, scrollViewRef])}
          horizontal={horizontal}
          style={style}
          contentContainerStyle={contentContainerStyle}
          onScroll={onScroll}
          testID={testID}
        >
          {children}
        </AnyScrollView>
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
  },
);
SpatialNavigationScrollView.displayName = 'SpatialNavigationScrollView';
