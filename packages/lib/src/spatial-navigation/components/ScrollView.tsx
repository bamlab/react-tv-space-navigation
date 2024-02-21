import React, {
  useCallback,
  RefObject,
  useRef,
  cloneElement,
  ReactElement,
  useState,
  ReactNode,
} from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import {
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../context/ParentScrollContext';
import { scrollToNewlyFocusedElement } from '../helpers/scrollToNewlyfocusedElement';
import { useDevice } from '../context/DeviceContext';

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
};

export const SpatialNavigationScrollView = ({
  horizontal = false,
  style,
  offsetFromStart = 0,
  children,
  topArrow,
  bottomArrow,
}: Props) => {
  const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
    useSpatialNavigatorParentScroll();
  const scrollViewRef = useRef<ScrollView>(null);
  const { deviceType } = useDevice();
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

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

  const onMouseOverTop = () => {
    const id = setInterval(() => {
      scrollViewRef.current?.scrollBy({
        top: -10,
      });
    }, 10);
    setIntervalId(id);
  };

  const onMouseOverBottom = () => {
    const id = setInterval(() => {
      scrollViewRef.current?.scrollBy({
        top: 10,
      });
    }, 10);
    setIntervalId(id);
  };

  const onMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
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
      >
        {children}
      </ScrollView>
      {deviceType === 'remotePointer' ? (
        <>
          <View
            style={{ position: 'absolute' }}
            onMouseEnter={onMouseOverTop}
            onMouseLeave={onMouseLeave}
          >
            {topArrow}
          </View>
          <View onMouseEnter={onMouseOverBottom} onMouseLeave={onMouseLeave}>
            {bottomArrow}
          </View>
        </>
      ) : undefined}
    </SpatialNavigatorParentScrollContext.Provider>
  );
};
