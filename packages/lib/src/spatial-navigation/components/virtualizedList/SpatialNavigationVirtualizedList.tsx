import { useMemo } from 'react';
import { SpatialNavigationNode } from '../Node';
import {
  PointerScrollProps,
  SpatialNavigationVirtualizedListWithScroll,
  SpatialNavigationVirtualizedListWithScrollProps,
} from './SpatialNavigationVirtualizedListWithScroll';
import { typedMemo } from '../../helpers/TypedMemo';
import { addIndex } from './helpers/addIndex';
import { ItemWithIndex } from './VirtualizedList';

/**
 * Use this component to render horizontally or vertically virtualized lists with spatial navigation
 * This component wraps the virtualized list inside a parent navigation node.
 * */
export const SpatialNavigationVirtualizedList = typedMemo(
  <T,>(props: SpatialNavigationVirtualizedListWithScrollProps<T> & PointerScrollProps) => {
    const indexedData = useMemo(() => addIndex(props.data), [props.data]);

    return (
      <SpatialNavigationNode
        alignInGrid={props.isGrid ?? false}
        orientation={props.orientation ?? 'horizontal'}
      >
        <SpatialNavigationVirtualizedListWithScroll<T & ItemWithIndex>
          {...props}
          data={indexedData}
        />
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationVirtualizedList.displayName = 'SpatialNavigationVirtualizedList';
