import { Directions, SpatialNavigation } from '../../../../../lib/src';
import TestRemoteControlManager, { SupportedKeys } from './testRemoteControlManager';

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping: { [key in SupportedKeys]: Directions | null } = {
      [SupportedKeys.Right]: Directions.RIGHT,
      [SupportedKeys.Left]: Directions.LEFT,
      [SupportedKeys.Up]: Directions.UP,
      [SupportedKeys.Down]: Directions.DOWN,
      [SupportedKeys.Enter]: Directions.ENTER,
      [SupportedKeys.Back]: null,
    };

    const remoteControlListener = (keyEvent: SupportedKeys) => {
      callback(mapping[keyEvent]);
    };

    return TestRemoteControlManager.addKeydownListener(remoteControlListener);
  },

  remoteControlUnsubscriber: (remoteControlListener) => {
    TestRemoteControlManager.removeKeydownListener(remoteControlListener);
  },
});
