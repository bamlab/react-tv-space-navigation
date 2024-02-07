import { ScrollBehavior } from '../VirtualizedList';

const computeStickToStartTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  data,
  listSizeInPx,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  data?: T[];
  listSizeInPx?: number;
}) => {
  let scrollOffset: number;
  if (typeof itemSizeInPx === 'number') {
    const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
    const leftAlignedIndex = Math.min(currentlyFocusedItemIndex, maxPossibleLeftAlignedIndex);
    scrollOffset = leftAlignedIndex * itemSizeInPx;
  } else if (data && listSizeInPx) {
    const maxPossibleLeftAlignedIndex = getLastLeftItemIndex<T>(data, itemSizeInPx, listSizeInPx);
    currentlyFocusedItemIndex < maxPossibleLeftAlignedIndex
      ? (scrollOffset = data
          .slice(0, currentlyFocusedItemIndex)
          .reduce((acc, item) => acc + itemSizeInPx(item), 0))
      : (scrollOffset = data
          .slice(0, maxPossibleLeftAlignedIndex)
          .reduce((acc, item) => acc + itemSizeInPx(item), 0));
  } else {
    throw new Error('itemSizeInPx is a function but data or list size is not provided');
  }
  return -scrollOffset;
};

const computeStickToEndTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  numberOfItemsVisibleOnScreen,
  data,
  listSizeInPx,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  numberOfItemsVisibleOnScreen: number;
  data?: T[];
  listSizeInPx?: number;
}) => {
  let scrollOffset: number;
  if (typeof itemSizeInPx === 'number') {
    const rightAlignedIndex = Math.max(
      currentlyFocusedItemIndex - numberOfItemsVisibleOnScreen + 1,
      0, // Equals to minPossibleLeftAlignedIndex
    );
    const scrollOffset = rightAlignedIndex * itemSizeInPx;
    return -scrollOffset;
  } else if (data && listSizeInPx) {
    const maxPossibleRightAlignedIndex = getLastRightItemIndex<T>(data, itemSizeInPx, listSizeInPx);
    currentlyFocusedItemIndex > maxPossibleRightAlignedIndex
      ? (scrollOffset =
          data
            .slice(0, currentlyFocusedItemIndex)
            .reduce((acc, item) => acc + itemSizeInPx(item), 0) +
          itemSizeInPx(data[currentlyFocusedItemIndex]) -
          listSizeInPx)
      : (scrollOffset = 0);
  } else {
    throw new Error('itemSizeInPx is a function but data or list size is not provided');
  }
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
  if (typeof itemSizeInPx === 'number') {
    const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
    const indexOfItemToFocus =
      currentlyFocusedItemIndex - (currentlyFocusedItemIndex % numberOfItemsVisibleOnScreen);
    const leftAlignedIndex = Math.min(indexOfItemToFocus, maxPossibleLeftAlignedIndex);
    const scrollOffset = leftAlignedIndex * itemSizeInPx;
    return -scrollOffset;
  } else {
    throw new Error('jump-on-scroll scroll behavior is not supported with dynamic item size');
  }
};

export const computeTranslation = <T>({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
  data,
  listSizeInPx,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
  data?: T[];
  listSizeInPx?: number;
}) => {
  switch (scrollBehavior) {
    case 'stick-to-start':
      return computeStickToStartTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        nbMaxOfItems,
        numberOfItemsVisibleOnScreen,
        data,
        listSizeInPx,
      });
    case 'stick-to-end':
      return computeStickToEndTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        numberOfItemsVisibleOnScreen,
        data,
        listSizeInPx,
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

const getLastLeftItemIndex = <T>(
  data: T[],
  itemSizeInPx: (item: T) => number,
  listSizeInPx: number,
): number => {
  let totalSize = 0;

  for (let index = data.length - 1; index >= 0; index--) {
    totalSize += itemSizeInPx(data[index]);

    if (totalSize >= listSizeInPx) {
      // If we exceed the list size, we return the index of the previous item (list is iterated backwards, so index + 1)
      return index + 1;
    }
  }

  return 0;
};

const getLastRightItemIndex = <T>(
  data: T[],
  itemSizeInPx: (item: T) => number,
  listSizeInPx: number,
): number => {
  let totalSize = 0;

  for (let index = 0; index < data.length; index++) {
    totalSize += itemSizeInPx(data[index]);

    if (totalSize >= listSizeInPx) {
      // If we exceed the list size, we return the index of the previous item
      return index - 1;
    }
  }

  return data.length - 1;
};
