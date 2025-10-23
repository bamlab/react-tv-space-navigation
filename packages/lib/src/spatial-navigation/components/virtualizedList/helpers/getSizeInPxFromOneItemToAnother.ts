/**
 * This function is used to compute the size in pixels of a range of items in a list.
 * If you want the size taken by items from index 0 to 5, you can call this function with
 * start = 0 and end = 5. The size is computed by summing the size of each item in the range.
 * Similarly, if you want to calculate from the other direct, you can call this function
 * with start = 5 and end = 0.
 * @param data The list of items
 * @param itemSizeInPx The size of an item in pixels. It can be a number or a function that takes an item and returns a number.
 * @param start The start index of the range
 * @param end The end index of the range
 * @returns The size in pixels of the range of items
 **/
export const getSizeInPxFromOneItemToAnother = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  start: number,
  end: number,
): number => {
  const startIndex = start < end ? start : end;
  const endIndex = end > start ? end : start;

  if (typeof itemSizeInPx === 'function') {
    return data.slice(startIndex, endIndex).reduce((acc, item) => acc + itemSizeInPx(item), 0);
  }
  return data.slice(startIndex, endIndex).length * itemSizeInPx;
};
