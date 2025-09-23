import { forwardRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { NodeOrientation } from '../types/orientation';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { SpatialNavigationNode } from './Node';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  direction: NodeOrientation;
  alignInGrid?: boolean;
};

export const SpatialNavigationView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ direction = 'horizontal', alignInGrid = false, children, style }: Props, ref) => {
    return (
      <SpatialNavigationNode orientation={direction} alignInGrid={alignInGrid} ref={ref}>
        <View
          style={[style, stylesByDirection[direction]]}
        >
          {children}
        </View>
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationView.displayName = 'SpatialNavigationView';

const styles = StyleSheet.create({
  viewVertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewVerticalReverse: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  viewHorizontalReverse: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

const stylesByDirection = {
  'horizontal':  styles.viewHorizontal,
  'vertical':  styles.viewVertical,
  'horizontal-reverse':  styles.viewHorizontalReverse,
  'vertical-reverse':  styles.viewVerticalReverse,
} as const;