import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import RemoteControlManager from './remote-control/RemoteControlManager';
import { SupportedKeys } from './remote-control/SupportedKeys';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (pressedKey !== SupportedKeys.Back) return;
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };
    RemoteControlManager.addKeydownListener(remoteControlListener);

    return () => RemoteControlManager.removeKeydownListener(remoteControlListener);
  }, [navigation]);

  return <></>;
};
