export const getSizeInPxFromOneItemToAnother = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  start: number,
  end: number,
): number => {
  if (typeof itemSizeInPx === 'function')
    return data.slice(start, end).reduce((acc, item) => acc + itemSizeInPx(item), 0);
  else return data.slice(start, end).length * itemSizeInPx;
};
