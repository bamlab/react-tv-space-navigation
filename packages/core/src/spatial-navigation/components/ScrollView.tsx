import React, { useCallback, RefObject, useRef } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../helpers/scrollToNewlyfocusedElement';

type Props = {
  horizontal?: boolean;
  offsetFromStart?: number;
  children: React.ReactNode;
  style?: ViewStyle;
};

export const SpatialNavigationScrollView = ({
  horizontal = false,
  style,
  offsetFromStart = 0,
  children,
}: Props) => {
  const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
    useSpatialNavigatorParentScroll();
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToNode = useCallback(
    (newlyFocusedElementRef: RefObject<View>) => {
      try {
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
      } catch {
        // A crash can happen when calling measureLayout when a page unmounts. No impact on focus detected in regular use cases.
      }
      makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef); // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
    },
    [makeParentsScrollToNodeIfNeeded, horizontal, offsetFromStart],
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
      >
        {children}
      </ScrollView>
    </SpatialNavigatorParentScrollContext.Provider>
  );
};
