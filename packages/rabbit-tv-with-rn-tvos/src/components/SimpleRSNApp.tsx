import {
  Node,
  Root,
  SpatialNavigatorView,
} from '@react-spatial-navigation/core/src';
import {Program} from './Program';
import './configureKeyboard';

const SimpleNode = () => {
  return (
    <Node isFocusable>
      {({isFocused}) => <Program touchable={false} isFocused={isFocused} />}
    </Node>
  );
};

export const SimpleRSNApp = () => {
  return (
    <Root>
      <SpatialNavigatorView direction="horizontal">
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
      </SpatialNavigatorView>
      <SpatialNavigatorView direction="horizontal">
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
        <SimpleNode />
      </SpatialNavigatorView>
    </Root>
  );
};
