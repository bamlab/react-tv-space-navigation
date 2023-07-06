import { ItemWithIndex } from './CustomVirtualizedList';
import { SpatialNavigationNode } from '../Node';
import {
  SpatialNavigatorVirtualizedListWithScroll,
  SpatialNavigatorVirtualizedListWithScrollProps,
} from './SpatialNavigatorVirtualizedListWithScroll';
import { typedMemo } from '../../helpers/TypedMemo';

export const SpatialNavigatorVirtualizedList = typedMemo(
  <T extends ItemWithIndex>(props: SpatialNavigatorVirtualizedListWithScrollProps<T>) => {
    return (
      <SpatialNavigationNode orientation={props.orientation ?? 'horizontal'}>
        <SpatialNavigatorVirtualizedListWithScroll {...props} />
      </SpatialNavigationNode>
    );
  },
);
