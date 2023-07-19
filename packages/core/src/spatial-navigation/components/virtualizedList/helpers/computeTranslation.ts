import { ScrollBehavior } from '../VirtualizedList';

const computeStickToStartTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
}) => {
  const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
  const leftAlignedIndex = Math.min(currentlyFocusedItemIndex, maxPossibleLeftAlignedIndex);
  const scrollOffset = leftAlignedIndex * itemSizeInPx;
  return -scrollOffset;
};

const computeStickToEndTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  numberOfItemsVisibleOnScreen,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  numberOfItemsVisibleOnScreen: number;
}) => {
  const rightAlignedIndex = Math.max(
    currentlyFocusedItemIndex - numberOfItemsVisibleOnScreen + 1,
    0, // Equals to minPossibleLeftAlignedIndex
  );
  const scrollOffset = rightAlignedIndex * itemSizeInPx;
  return -scrollOffset;
};

const computeJumpOnScrollTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
}) => {
  const maxPossibleLeftAlignedIndex = Math.max(nbMaxOfItems - numberOfItemsVisibleOnScreen, 0);
  const indexOfItemToFocus =
    currentlyFocusedItemIndex - (currentlyFocusedItemIndex % numberOfItemsVisibleOnScreen);
  const leftAlignedIndex = Math.min(indexOfItemToFocus, maxPossibleLeftAlignedIndex);
  const scrollOffset = leftAlignedIndex * itemSizeInPx;
  return -scrollOffset;
};

export const computeTranslation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
}: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
}) => {
  switch (scrollBehavior) {
    case 'stick-to-start':
      return computeStickToStartTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        nbMaxOfItems,
        numberOfItemsVisibleOnScreen,
      });
    case 'stick-to-end':
      return computeStickToEndTranslation({
        currentlyFocusedItemIndex,
        itemSizeInPx,
        numberOfItemsVisibleOnScreen,
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
