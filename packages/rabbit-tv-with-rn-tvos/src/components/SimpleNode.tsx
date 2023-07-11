import {SpatialNavigationNode} from 'react-native-tv-spatial-navigation/src';

import {Program} from './Program';

export const SimpleNode = () => {
  return (
    <SpatialNavigationNode isFocusable>
      {({isFocused}) => <Program touchable={false} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};
