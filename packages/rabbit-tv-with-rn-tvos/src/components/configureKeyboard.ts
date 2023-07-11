import { Directions, SpatialNavigation } from 'react-native-tv-spatial-navigation/src';

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: (callback) => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
      Enter: Directions.ENTER,
    };

    const keyboardListener = (keyEvent: KeyboardEvent) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO fix me, but this is just a demo anyway
      callback(mapping[keyEvent.code]);
    };

    window.addEventListener('keydown', keyboardListener);

    return keyboardListener;
  },

  keyboardUnsubscriber: (keyboardListener) => {
    window.removeEventListener('keydown', keyboardListener);
  },
});
