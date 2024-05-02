import { useNavigation } from '@react-navigation/native';
import { SupportedKeys } from './remote-control/SupportedKeys';
import { useKey } from '../hooks/useKey';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  BackHandler.addEventListener('hardwareBackPress', () => true);

  const goBackOnBackPress = useCallback(
    (pressedKey: SupportedKeys) => {
      if (pressedKey !== SupportedKeys.Back) return false;
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    },
    [navigation],
  );

  useKey(SupportedKeys.Back, goBackOnBackPress);

  return <></>;
};
