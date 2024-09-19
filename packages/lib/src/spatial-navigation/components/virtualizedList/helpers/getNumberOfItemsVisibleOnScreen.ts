const getMinSizeOfItems = <T>({
  data,
  itemSize,
}: {
  data: T[];
  itemSize: number | ((item: T) => number);
}) => {
  if (typeof itemSize === 'number') {
    return itemSize;
  }

  if (data.length === 0) {
    return 0;
  }

  const firstElementSize = itemSize(data[0]);

  const minSize = data.reduce<number>((smallestSize, item) => {
    const currentSize = itemSize(item);
    if (currentSize < smallestSize) return currentSize;
    return smallestSize;
  }, firstElementSize);

  if (minSize === 0) {
    console.warn('The size of the smallest item in the list is 0. The list will appear empty.');
  }

  return minSize;
};

export const getNumberOfItemsVisibleOnScreen = <T>({
  data,
  listSizeInPx,
  itemSize,
}: {
  data: T[];
  listSizeInPx: number;
  itemSize: number | ((item: T) => number);
}) => {
  if (data.length === 0) {
    return 0;
  }

  const itemSizeToComputeRanges = getMinSizeOfItems({ data, itemSize });

  if (!itemSizeToComputeRanges) {
    return 0;
  }

  if (itemSizeToComputeRanges === 0) {
    console.warn('The size of the smallest item in the list is 0. The list will appear empty.');
    return 0;
  }

  return Math.floor(listSizeInPx / itemSizeToComputeRanges);
};
