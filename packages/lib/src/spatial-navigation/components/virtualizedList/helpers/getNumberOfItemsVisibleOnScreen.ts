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

  let minSize = itemSize(data[0]); // Initialize with the size of the first item

  for (let i = 1; i < data.length; i++) {
    const currentSize = itemSize(data[i]);
    if (currentSize < minSize) {
      minSize = currentSize;
    }
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
  const itemSizeToComputeRanges = getMinSizeOfItems({ data, itemSize });
  return Math.floor(listSizeInPx / itemSizeToComputeRanges);
};
