import {View} from 'react-native';
import KeyEvent from 'react-native-keyevent';
import {
  Directions,
  Node,
  Root,
  SpatialNavigatorView,
  configure,
} from '@react-spatial-navigation/core/src';
import {Program} from './Program';

configure({
  keyboardSubscriber: callback => {
    KeyEvent.onKeyDownListener((keyEvent: {keyCode: number}) => {
      const mappedKeys = {
        21: Directions.LEFT,
        22: Directions.RIGHT,
        20: Directions.DOWN,
        19: Directions.UP,
      };
      // @ts-ignore -- TODO fix this later, it'a just an example
      callback(mappedKeys[keyEvent.keyCode]);
    });
  },
  keyboardUnsubscriber: () => {
    KeyEvent.removeKeyDownListener();
  },
});

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
