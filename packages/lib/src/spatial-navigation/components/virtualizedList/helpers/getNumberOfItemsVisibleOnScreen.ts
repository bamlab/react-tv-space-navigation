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

  let minSize: number | undefined = undefined;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item !== undefined) {
      const currentSize = itemSize(item);
      if (minSize === undefined || currentSize < minSize) {
        minSize = currentSize;
      }
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

  if (!itemSizeToComputeRanges) {
    return 0;
  }

  return Math.floor(listSizeInPx / itemSizeToComputeRanges);
};
