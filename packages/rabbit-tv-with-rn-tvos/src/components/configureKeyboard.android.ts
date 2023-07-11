// Did not manage to make this work with TVEventHandler from react-native...

import KeyEvent from 'react-native-keyevent';
import { Directions, SpatialNavigation } from 'react-native-tv-spatial-navigation/src';

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: (callback) => {
    KeyEvent.onKeyDownListener((keyEvent: { keyCode: number }) => {
      const mappedKeys = {
        21: Directions.LEFT,
        22: Directions.RIGHT,
        20: Directions.DOWN,
        19: Directions.UP,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- TODO fix this later, it'a just an example
      callback(mappedKeys[keyEvent.keyCode]);
    });
  },
  keyboardUnsubscriber: () => {
    KeyEvent.removeKeyDownListener();
  },
});
