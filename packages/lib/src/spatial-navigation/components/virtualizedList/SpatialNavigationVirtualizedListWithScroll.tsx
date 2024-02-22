import { useCallback, useRef, useState } from 'react';
import { VirtualizedListProps, ItemWithIndex } from './VirtualizedList';

import {
  SpatialNavigationVirtualizedListWithVirtualNodes,
  SpatialNavigationVirtualizedListWithVirtualNodesProps,
  SpatialNavigationVirtualizedListWithVirtualNodesRef,
} from './SpatialNavigationVirtualizedListWithVirtualNodes';
import {
  ScrollToNodeCallback,
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../../context/ParentScrollContext';
import { typedMemo } from '../../helpers/TypedMemo';
import { useDevice } from '../../context/DeviceContext';
import { View, Platform, ViewStyle } from 'react-native';
import { useSpatialNavigator } from '../../context/SpatialNavigatorContext';

const ItemWrapperWithScrollContext = typedMemo(
  <T extends ItemWithIndex>({
    setCurrentlyFocusedItemIndex,
    item,
    renderItem,
  }: {
    setCurrentlyFocusedItemIndex: (i: number) => void;
    item: T;
    renderItem: VirtualizedListProps<T>['renderItem'];
  }) => {
    const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
      useSpatialNavigatorParentScroll();

    const scrollToItem: ScrollToNodeCallback = useCallback(
      (newlyFocusedElementRef) => {
        setCurrentlyFocusedItemIndex(item.index);
        // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
        makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef);
      },
      [makeParentsScrollToNodeIfNeeded, setCurrentlyFocusedItemIndex, item.index],
    );

    return (
      <SpatialNavigatorParentScrollContext.Provider value={scrollToItem}>
        {renderItem({ item })}
      </SpatialNavigatorParentScrollContext.Provider>
    );
  },
);
ItemWrapperWithScrollContext.displayName = 'ItemWrapperWithScrollContext';

export type SpatialNavigationVirtualizedListWithScrollProps<T> = Omit<
  SpatialNavigationVirtualizedListWithVirtualNodesProps<T>,
  'currentlyFocusedItemIndex'
>;

export type PointerScrollProps = {
  descendingArrow?: React.ReactElement;
  descendingArrowContainerStyle?: ViewStyle;
  ascendingArrow?: React.ReactElement;
  ascendingArrowContainerStyle?: ViewStyle;
  scrollInterval?: number;
};

/**
 * This component wraps every item of a virtualizedList in a scroll handling context.
 */
export const SpatialNavigationVirtualizedListWithScroll = typedMemo(
  <T extends ItemWithIndex>(
    props: SpatialNavigationVirtualizedListWithScrollProps<T> & PointerScrollProps,
  ) => {
    const {
      data,
      renderItem,
      descendingArrow: descendingArrow,
      ascendingArrow: ascendingArrow,
      descendingArrowContainerStyle: descendingArrowContainerStyle,
      ascendingArrowContainerStyle: ascendingArrowContainerStyle,
      scrollInterval = 100,
    } = props;
    const {
      deviceType,
      getScrollingIntervalId: getScrollingId,
      setScrollingIntervalId: setScrollingId,
    } = useDevice();
    const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = useState(0);
    const navigator = useSpatialNavigator();
    const hasArrows = descendingArrow && ascendingArrow;

    const idRef = useRef<SpatialNavigationVirtualizedListWithVirtualNodesRef>(null);
    const idRefCurrent = idRef.current;
    const grabFocus = navigator.grabFocus;

    const setCurrentlyFocusedItemIndexCallback = useCallback(
      (index: number) => {
        deviceType === 'remoteKeys' ? setCurrentlyFocusedItemIndex(index) : null;
      },
      [deviceType],
    );

    const onMouseEnterLeft = () => {
      const callback = () => {
        setCurrentlyFocusedItemIndex((index) => {
          if (index > 0) {
            if (idRefCurrent) grabFocus(idRefCurrent.getNthVirtualNodeID(index - 1));
            return index - 1;
          } else {
            return index;
          }
        });
      };

      const id = setInterval(() => {
        callback();
      }, scrollInterval);
      setScrollingId(id);
    };

    const onMouseLeave = () => {
      const intervalId = getScrollingId();
      if (intervalId) {
        clearInterval(intervalId);
        setScrollingId(null);
      }
    };

    const onMouseEnterRight = () => {
      const callback = () => {
        setCurrentlyFocusedItemIndex((index) => {
          if (index < data.length - 1) {
            if (idRefCurrent) {
              grabFocus(idRefCurrent.getNthVirtualNodeID(index + 1));
            }
            return index + 1;
          } else {
            return index;
          }
        });
      };
      const id = setInterval(() => {
        callback();
      }, scrollInterval);
      setScrollingId(id);
    };

    const webPropsLeft = Platform.select({
      web: {
        onMouseEnter: onMouseEnterLeft,
        onMouseLeave: onMouseLeave,
      },
    });

    const webPropsRight = Platform.select({
      web: {
        onMouseEnter: onMouseEnterRight,
        onMouseLeave: onMouseLeave,
      },
    });

    const renderWrappedItem: typeof props.renderItem = useCallback(
      ({ item }) => (
        <ItemWrapperWithScrollContext
          setCurrentlyFocusedItemIndex={setCurrentlyFocusedItemIndexCallback}
          renderItem={renderItem}
          item={item}
        />
      ),
      [setCurrentlyFocusedItemIndexCallback, renderItem],
    );

    return (
      <>
        <SpatialNavigationVirtualizedListWithVirtualNodes
          {...props}
          idRef={idRef}
          currentlyFocusedItemIndex={currentlyFocusedItemIndex}
          renderItem={renderWrappedItem}
        />
        {deviceType === 'remotePointer' && hasArrows ? (
          <>
            <View style={descendingArrowContainerStyle} {...webPropsLeft}>
              {descendingArrow}
            </View>
            <View style={ascendingArrowContainerStyle} {...webPropsRight}>
              {ascendingArrow}
            </View>
          </>
        ) : undefined}
      </>
    );
  },
);
SpatialNavigationVirtualizedListWithScroll.displayName =
  'SpatialNavigationVirtualizedListWithScroll';
