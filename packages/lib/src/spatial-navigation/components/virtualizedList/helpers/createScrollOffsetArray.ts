import { ScrollBehavior } from '../VirtualizedList';
import { computeTranslation } from './computeTranslation';
import { getLastLeftItemIndex, getLastRightItemIndex } from './getLastItemIndex';

/**
 * This function precomputes all scroll offsets
 * It won't move until data moves or the itemSize changes
 */
export const computeAllScrollOffsets = <T>({
  itemSize,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
  data,
  listSizeInPx,
}: {
  itemSize: number | ((item: T) => number);
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
  data: T[];
  listSizeInPx: number;
}) => {
  const maxPossibleLeftAlignedIndex = getLastLeftItemIndex<T>(data, itemSize, listSizeInPx);
  const maxPossibleRightAlignedIndex = getLastRightItemIndex<T>(data, itemSize, listSizeInPx);

  const scrollOffsets = data.map((_, index) =>
    computeTranslation({
      currentlyFocusedItemIndex: index,
      itemSizeInPx: itemSize,
      nbMaxOfItems: nbMaxOfItems ?? data.length,
      numberOfItemsVisibleOnScreen: numberOfItemsVisibleOnScreen,
      scrollBehavior: scrollBehavior,
      data: data,
      listSizeInPx: listSizeInPx,
      maxPossibleLeftAlignedIndex: maxPossibleLeftAlignedIndex,
      maxPossibleRightAlignedIndex: maxPossibleRightAlignedIndex,
    }),
  );

  return scrollOffsets;
};
