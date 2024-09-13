import { useEffect } from 'react';
import RemoteControlManager from '../components/remote-control/RemoteControlManager';
import { SupportedKeys } from '../components/remote-control/SupportedKeys';

/**
 * A convenient hook to listen to a key and react to it
 *
 * @example useKey(SupportedKeys.Back, () => { console.log('pressed back!') })
 */
export const useKey = (key: SupportedKeys, callback: (pressedKey: SupportedKeys) => boolean) => {
  useEffect(() => {
    const remoteControlListener = (actualKey: SupportedKeys) => {
      if (actualKey !== key) return;
      return callback(key);
    };
    // @ts-expect-error TODO fix the type error
    RemoteControlManager.addKeydownListener(remoteControlListener);
    // @ts-expect-error TODO fix the type error
    return () => RemoteControlManager.removeKeydownListener(remoteControlListener);
  }, [key, callback]);
};
