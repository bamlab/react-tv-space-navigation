import { useRef } from 'react';
import { Animated } from 'react-native';

export const useRotateAnimation = () => {
  const rotationZ = useRef(new Animated.Value(0)).current;

  const rotate360 = () => {
    Animated.timing(rotationZ, {
      toValue: 360,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start(() => {
      rotationZ.setValue(0); // Reset to 0 after completing a full rotation
    });
  };

  const animatedStyle = {
    transform: [
      {
        rotateZ: rotationZ.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return { rotate360, animatedStyle };
};
