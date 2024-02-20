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
import { SpatialNavigationNode } from '../Node';

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

/**
 * This component wraps every item of a virtualizedList in a scroll handling context.
 */
export const SpatialNavigationVirtualizedListWithScroll = typedMemo(
  <T extends ItemWithIndex>(
    props: SpatialNavigationVirtualizedListWithScrollProps<T> & {
      leftArrow?: React.ReactNode;
      rightArrow?: React.ReactNode;
    },
  ) => {
    const { deviceType } = useDevice();
    const { renderItem } = props;
    const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = useState(0);

    const setCurrentlyFocusedItemIndexCallback = useCallback(
      (index: number) => {
        deviceType === 'remoteKeys' ? setCurrentlyFocusedItemIndex(index) : null;
      },
      [deviceType],
    );

    const onMouseOverLeft = () => {
      setCurrentlyFocusedItemIndex((index) => {
        if (index > 0) {
          return index - 1;
        } else {
          return index;
        }
      });
    };

    const onMouseOverRight = () => {
      setCurrentlyFocusedItemIndex((index) => {
        return index + 1;
      });
    };

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
        {deviceType === 'remotePointer' ? (
          <>
            <SpatialNavigationNode isFocusable={false} onMouseOver={onMouseOverLeft}>
              {props.leftArrow}
            </SpatialNavigationNode>
            <SpatialNavigationNode isFocusable={false} onMouseOver={onMouseOverRight}>
              {props.rightArrow}
            </SpatialNavigationNode>
          </>
        ) : undefined}
      </>
    );
  },
);
SpatialNavigationVirtualizedListWithScroll.displayName =
  'SpatialNavigationVirtualizedListWithScroll';
