import { View } from 'react-native';
import { Node } from '@react-spatial-navigation/core';

export const SpatialNavigatorView = ({
  direction = 'horizontal',
  children,
}: {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}) => {
  return (
    <Node orientation={direction}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          borderWidth: 1,
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: 20,
          margin: 20,
        }}
      >
        {children}
      </View>
    </Node>
  );
};
