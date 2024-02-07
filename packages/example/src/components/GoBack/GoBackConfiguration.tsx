import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import RemoteControlManager from '../remote-control/RemoteControlManager';
import { SupportedKeys } from '../remote-control/SupportedKeys';
import { useGoBack } from './GoBackContext';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();
  const { isGoBackActive } = useGoBack();

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (pressedKey !== SupportedKeys.Back) return;
      if (navigation.canGoBack() && isGoBackActive) {
        navigation.goBack();
      }
    };
    RemoteControlManager.addKeydownListener(remoteControlListener);

    return () => RemoteControlManager.removeKeydownListener(remoteControlListener);
  }, [navigation, isGoBackActive]);

  return <></>;
};
