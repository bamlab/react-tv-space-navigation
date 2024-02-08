import { ScrollBehavior } from '../VirtualizedList';
import { getSizeInPxFromOneItemToAnother } from './getSizeInPxFromOneItemToAnother';

const computeStickToStartTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  data,
  maxPossibleLeftAlignedIndex,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  data: T[];
  maxPossibleLeftAlignedIndex: number;
}) => {
  const scrollOffset =
    currentlyFocusedItemIndex < maxPossibleLeftAlignedIndex
      ? getSizeInPxFromOneItemToAnother(data, itemSizeInPx, 0, currentlyFocusedItemIndex)
      : getSizeInPxFromOneItemToAnother(data, itemSizeInPx, 0, maxPossibleLeftAlignedIndex);
  return -scrollOffset;
};

const computeStickToEndTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  data,
  listSizeInPx,
  maxPossibleRightAlignedIndex,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  data: T[];
  listSizeInPx: number;
  maxPossibleRightAlignedIndex: number;
}) => {
  if (currentlyFocusedItemIndex <= maxPossibleRightAlignedIndex) return -0;

  const currentlyFocusedItemSize =
    typeof itemSizeInPx === 'function'
      ? itemSizeInPx(data[currentlyFocusedItemIndex])
      : itemSizeInPx;

  const sizeOfListFromStartToCurrentlyFocusedItem = getSizeInPxFromOneItemToAnother(
    data,
    itemSizeInPx,
    0,
    currentlyFocusedItemIndex,
  );

  const scrollOffset =
    sizeOfListFromStartToCurrentlyFocusedItem + currentlyFocusedItemSize - listSizeInPx;
  return -scrollOffset;
};

const computeJumpOnScrollTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
}) => {
  if (typeof itemSizeInPx === 'function')
    throw new Error('jump-on-scroll scroll behavior is not supported with dynamic item size');

  const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
  const indexOfItemToFocus =
    currentlyFocusedItemIndex - (currentlyFocusedItemIndex % numberOfItemsVisibleOnScreen);
  const leftAlignedIndex = Math.min(indexOfItemToFocus, maxPossibleLeftAlignedIndex);
  const scrollOffset = leftAlignedIndex * itemSizeInPx;
  return -scrollOffset;
};

export const computeTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
  data,
  listSizeInPx,
  maxPossibleLeftAlignedIndex,
  maxPossibleRightAlignedIndex,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
  data: T[];
  listSizeInPx: number;
  maxPossibleLeftAlignedIndex: number;
  maxPossibleRightAlignedIndex: number;
}) => {
  switch (scrollBehavior) {
    case 'stick-to-start':
      return computeStickToStartTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        data,
        maxPossibleLeftAlignedIndex,
      });
    case 'stick-to-end':
      return computeStickToEndTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        data,
        listSizeInPx,
        maxPossibleRightAlignedIndex,
      });
    case 'jump-on-scroll':
      return computeJumpOnScrollTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        nbMaxOfItems,
        numberOfItemsVisibleOnScreen,
      });
    default:
      throw new Error(`Invalid scroll behavior: ${scrollBehavior}`);
  }
};
