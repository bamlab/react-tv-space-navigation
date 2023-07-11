import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardListener = (event: KeyboardEvent) => {
      if (event.code === 'Backspace') {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    };
    window.addEventListener('keydown', keyboardListener);

    return () => window.removeEventListener('keydown', keyboardListener);
  }, [navigation]);

  return <></>;
};
