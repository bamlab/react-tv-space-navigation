import { StyleSheet, View, ViewStyle } from 'react-native';
import { SpatialNavigationNode } from './Node';

export const SpatialNavigationView = ({
  direction = 'horizontal',
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  direction: 'horizontal' | 'vertical';
}) => {
  return (
    <SpatialNavigationNode orientation={direction}>
      <View
        style={[style, direction === 'horizontal' ? styles.viewHorizontal : styles.viewVertical]}
      >
        {children}
      </View>
    </SpatialNavigationNode>
  );
};

const styles = StyleSheet.create({
  viewVertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
});
