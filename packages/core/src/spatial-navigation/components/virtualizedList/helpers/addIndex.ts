export const addIndex = <T>(array: Array<T>) => {
  return array.map((value, index) => ({ index, ...value }));
};
