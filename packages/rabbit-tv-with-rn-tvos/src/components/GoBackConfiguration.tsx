import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import RemoteControlManager from './remote-control/RemoteControlManager';
import { SupportedKeys } from './remote-control/SupportedKeys';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardListener = (pressedKey: SupportedKeys) => {
      if (pressedKey !== SupportedKeys.Back) return;
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };
    RemoteControlManager.addKeydownListener(keyboardListener);

    return () => RemoteControlManager.removeKeydownListener(keyboardListener);
  }, [navigation]);

  return <></>;
};
