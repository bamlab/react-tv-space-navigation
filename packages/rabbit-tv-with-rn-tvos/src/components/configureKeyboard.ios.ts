import {TVEventHandler} from 'react-native';
import {Directions, configure} from '@react-spatial-navigation/core/src';

configure({
  keyboardSubscriber: callback => {
    const _tvEventHandler = new TVEventHandler();
    _tvEventHandler.enable(this, function (cmp, evt) {
      if (!evt) return;

      const mapping = {
        right: Directions.RIGHT,
        left: Directions.LEFT,
        up: Directions.UP,
        down: Directions.DOWN,
      };

      callback(mapping[evt.eventType]);
    });

    return _tvEventHandler;
  },
  keyboardUnsubscriber: _tvEventHandler => {
    _tvEventHandler.disable();
  },
});
