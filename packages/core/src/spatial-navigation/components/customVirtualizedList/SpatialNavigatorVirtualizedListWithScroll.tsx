import { useCallback, useState } from 'react';
import { CustomVirtualizedListProps, ItemWithIndex } from './CustomVirtualizedList';
import {
  SpatialNavigatorVirtualizedListWithVirtualNodes,
  SpatialNavigatorVirtualizedListWithVirtualNodesProps,
} from './SpatialNavigatorVirtualizedListWithVirtualNodes';
import {
  ScrollToNodeCallback,
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../../context/ParentScrollContext';
import { typedMemo } from '../../helpers/TypedMemo';

const ItemWrapperWithScrollContext = typedMemo(
  <T extends ItemWithIndex>({
    setCurrentlyFocusedItemIndex,
    item,
    renderItem,
  }: {
    setCurrentlyFocusedItemIndex: (i: number) => void;
    item: T;
    renderItem: CustomVirtualizedListProps<T>['renderItem'];
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

export type SpatialNavigatorVirtualizedListWithScrollProps<T extends ItemWithIndex> = Omit<
  SpatialNavigatorVirtualizedListWithVirtualNodesProps<T>,
  'currentlyFocusedItemIndex'
>;

export const SpatialNavigatorVirtualizedListWithScroll = typedMemo(
  <T extends ItemWithIndex>(props: SpatialNavigatorVirtualizedListWithScrollProps<T>) => {
    const { renderItem } = props;
    const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = useState(0);

    const setCurrentlyFocusedItemIndexCallback = useCallback((index: number) => {
      setCurrentlyFocusedItemIndex(index);
    }, []);

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
      <SpatialNavigatorVirtualizedListWithVirtualNodes
        {...props}
        currentlyFocusedItemIndex={currentlyFocusedItemIndex}
        renderItem={renderWrappedItem}
      />
    );
  },
);
