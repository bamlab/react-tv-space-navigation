import chunk from 'lodash/chunk';
import { GridRowType } from '../SpatialNavigationVirtualizedGrid';
import { ItemWithIndex } from '../../virtualizedList/VirtualizedList';
import { NodeOrientation } from '../../../types/orientation';

export const convertToGrid = <T extends ItemWithIndex>(
  data: T[],
  numberOfColumns: number,
): GridRowType<T>[] => {
  const rows: T[][] = chunk(data, numberOfColumns);

  return rows.map((items, index) => ({ items, index }));
};

export const invertOrientation = (orientation: NodeOrientation): NodeOrientation =>
  orientation === 'vertical' ? 'horizontal' : 'vertical';
