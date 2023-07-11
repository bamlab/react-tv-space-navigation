import { TVEventHandler } from 'react-native';
import { Directions, SpatialNavigation } from 'react-native-tv-spatial-navigation/src';

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: (callback) => {
    const _tvEventHandler = new TVEventHandler();
    _tvEventHandler.enable(this, function (cmp, evt) {
      if (!evt) return;

      const mapping = {
        right: Directions.RIGHT,
        left: Directions.LEFT,
        up: Directions.UP,
        down: Directions.DOWN,
        select: Directions.ENTER,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- TODO fix this later, it'a just an example
      callback(mapping[evt.eventType]);
    });

    return _tvEventHandler;
  },
  keyboardUnsubscriber: (_tvEventHandler) => {
    _tvEventHandler.disable();
  },
});
