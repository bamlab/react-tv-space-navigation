import { Directions, SpatialNavigation } from '@react-spatial-navigation/core/src';

const KeyMapping: Record<string, Directions> = {
  ArrowLeft: Directions.LEFT,
  ArrowRight: Directions.RIGHT,
  ArrowUp: Directions.UP,
  ArrowDown: Directions.DOWN,
  Enter: Directions.ENTER,
};

export const mapKeyCode = (keycode: string) => KeyMapping[keycode];

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: (callback) => {
    const mapper = (keycode: KeyboardEvent) => {
      callback(mapKeyCode(keycode.code));
    };

    window.addEventListener('keydown', mapper);
    return mapper;
  },

  keyboardUnsubscriber: (subscriber) => {
    window.removeEventListener('keydown', subscriber);
  },
});
