import { useFonts as useFontsLoader } from 'expo-font';

export const useFonts = (): { areFontsLoaded: boolean } => {
  const [fontsLoaded, fontError] = useFontsLoader({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return { areFontsLoaded: false };
  }

  return { areFontsLoaded: true };
};
