import {
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from '@react-spatial-navigation/core/src';
import {Program} from './Program';
import './configureKeyboard';

const SimpleNode = () => {
  return (
    <SpatialNavigationNode isFocusable>
      {({isFocused}) => <Program touchable={false} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};

export const SimpleRSNApp = () => {
  return (
    <SpatialNavigationRoot>
      <SpatialNavigationView direction="horizontal">
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
      </SpatialNavigationView>
      <SpatialNavigationView direction="horizontal">
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};
