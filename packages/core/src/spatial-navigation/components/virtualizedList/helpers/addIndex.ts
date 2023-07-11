import { ItemWithIndex } from '../VirtualizedList';

export const addIndex = <T>(array: Array<T>): Array<T & ItemWithIndex> => {
  return array.map((value, index) => ({ index, ...value }));
};
