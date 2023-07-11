import { ItemWithIndex } from './CustomVirtualizedList';
import { SpatialNavigationNode } from '../Node';
import {
  SpatialNavigatorVirtualizedListWithScroll,
  SpatialNavigatorVirtualizedListWithScrollProps,
} from './SpatialNavigatorVirtualizedListWithScroll';
import { typedMemo } from '../../helpers/TypedMemo';

/**
 * Use this component to render spatially navigable virtualized lists.
 * This component wraps the virtualized list inside a parent navigation node.
 * */
export const SpatialNavigatorVirtualizedList = typedMemo(
  <T extends ItemWithIndex>(props: SpatialNavigatorVirtualizedListWithScrollProps<T>) => {
    return (
      <SpatialNavigationNode orientation={props.orientation ?? 'horizontal'}>
        <SpatialNavigatorVirtualizedListWithScroll {...props} />
      </SpatialNavigationNode>
    );
  },
);
