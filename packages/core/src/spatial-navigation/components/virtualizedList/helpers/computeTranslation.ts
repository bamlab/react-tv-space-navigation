export const computeTranslation = ({
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
