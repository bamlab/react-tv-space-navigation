import { Directions, SpatialNavigation } from 'react-tv-space-navigation-rtl';
import { SupportedKeys } from './remote-control/SupportedKeys';
import RemoteControlManager from './remote-control/RemoteControlManager.android';
import { I18nManager } from 'react-native';

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping: { [key in SupportedKeys]: Directions | null } = {
      [SupportedKeys.Right]: (I18nManager.isRTL? Directions.LEFT: Directions.RIGHT),
      [SupportedKeys.Left]: (I18nManager.isRTL? Directions.RIGHT: Directions.LEFT),
      [SupportedKeys.Up]: Directions.UP,
      [SupportedKeys.Down]: Directions.DOWN,
      [SupportedKeys.Enter]: Directions.ENTER,
      [SupportedKeys.LongEnter]: Directions.LONG_ENTER,
      [SupportedKeys.Back]: null,
    };

    const remoteControlListener = (keyEvent: SupportedKeys) => {
      callback(mapping[keyEvent]);
      return false;
    };

    return RemoteControlManager.addKeydownListener(remoteControlListener);
  },

  remoteControlUnsubscriber: (remoteControlListener) => {
    RemoteControlManager.removeKeydownListener(remoteControlListener);
  },
});
