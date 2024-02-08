export const getLastLeftItemIndex = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  listSizeInPx: number,
): number => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;

    for (let index = data.length - 1; index >= 0; index--) {
      totalSize += itemSizeInPx(data[index]);

      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item (list is iterated backwards, so index + 1)
        return index + 1;
      }
    }

    return 0;
  }
  return data.length - Math.floor(listSizeInPx / itemSizeInPx);
};

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
  }
  // We substract 1 because index starts from 0
  return Math.floor(listSizeInPx / itemSizeInPx) - 1;
};
