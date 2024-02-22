import { useCallback, useState } from 'react';
import { VirtualizedListProps, ItemWithIndex } from './VirtualizedList';
import {
  SpatialNavigationVirtualizedListWithVirtualNodes,
  SpatialNavigationVirtualizedListWithVirtualNodesProps,
} from './SpatialNavigationVirtualizedListWithVirtualNodes';
import {
  ScrollToNodeCallback,
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../../context/ParentScrollContext';
import { typedMemo } from '../../helpers/TypedMemo';
import { useDevice } from '../../context/DeviceContext';
import { View, Platform, ViewStyle } from 'react-native';

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
      renderItem,
      descendingArrow: descendingArrow,
      ascendingArrow: ascendingArrow,
      descendingArrowContainerStyle: descendingArrowContainerStyle,
      ascendingArrowContainerStyle: ascendingArrowContainerStyle,
      scrollInterval = 100,
    } = props;
    const { deviceType } = useDevice();
    const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const hasArrows = descendingArrow && ascendingArrow;

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
            return index - 1;
          } else {
            return index;
          }
        });
      };

      const id = setInterval(() => {
        callback();
      }, scrollInterval);
      setIntervalId(id);
    };

    const onMouseLeave = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };

    const onMouseEnterRight = () => {
      const callback = () => {
        setCurrentlyFocusedItemIndex((index) => {
          return index + 1;
        });
      };
      const id = setInterval(() => {
        callback();
      }, scrollInterval);
      setIntervalId(id);
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
