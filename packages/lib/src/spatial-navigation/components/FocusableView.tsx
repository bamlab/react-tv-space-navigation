import { SpatialNavigationNode, SpatialNavigationNodeDefaultProps } from './Node';
import { View, ViewStyle } from 'react-native';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';

type Props = SpatialNavigationNodeDefaultProps & {
  style?: ViewStyle;
  children:
    | React.ReactElement
    | ((props: { isFocused: boolean; isActive: boolean }) => React.ReactElement);
};

export const SpatialNavigationFocusableView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ children, style, ...props }: Props, ref) => {
    return (
      <SpatialNavigationNode isFocusable {...props} ref={ref}>
        {({ isFocused, isActive }) => (
          <View style={style}>
            {typeof children === 'function' ? children({ isFocused, isActive }) : children}
          </View>
        )}
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationFocusableView.displayName = 'SpatialNavigationFocusableView';
