import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export const GoBackConfiguration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.error('Keyboard not implemented on ios - you wont be able to go back');
  }, [navigation]);

  return <></>;
};
