import { ForwardedRef, useMemo } from 'react';
import { SpatialNavigationNode } from '../Node';
import {
  PointerScrollProps,
  SpatialNavigationVirtualizedListWithScroll,
  SpatialNavigationVirtualizedListWithScrollProps,
} from './SpatialNavigationVirtualizedListWithScroll';
import { typedMemo } from '../../helpers/TypedMemo';
import { addIndex } from './helpers/addIndex';
import { typedForwardRef } from '../../helpers/TypedForwardRef';
import { SpatialNavigationVirtualizedListRef } from '../../types/SpatialNavigationVirtualizedListRef';

/**
 * Use this component to render horizontally or vertically virtualized lists with spatial navigation
 * This component wraps the virtualized list inside a parent navigation node.
 * */
export const SpatialNavigationVirtualizedList = typedMemo(
  typedForwardRef(
    <T,>(
      props: SpatialNavigationVirtualizedListWithScrollProps<T> & PointerScrollProps,
      ref: ForwardedRef<SpatialNavigationVirtualizedListRef>,
    ) => {
      const indexedData = useMemo(() => addIndex(props.data), [props.data]);

      return (
        <SpatialNavigationNode
          alignInGrid={props.isGrid ?? false}
          orientation={props.orientation ?? 'horizontal'}
        >
          <SpatialNavigationVirtualizedListWithScroll<T> {...props} data={indexedData} ref={ref} />
        </SpatialNavigationNode>
      );
    },
  ),
);
SpatialNavigationVirtualizedList.displayName = 'SpatialNavigationVirtualizedList';
