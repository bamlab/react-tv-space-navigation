export const getLastRightItemIndex = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  listSizeInPx: number,
): number => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;

    for (let index = 0; index < data.length; index++) {
      totalSize += itemSizeInPx(data[index]);

      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item
        return index - 1;
      }
    }

    return data.length - 1;
  } else {
    // Web substract 1 because index start from 0
    return Math.floor(listSizeInPx / itemSizeInPx) - 1;
  }
};
