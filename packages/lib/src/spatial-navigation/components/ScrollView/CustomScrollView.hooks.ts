import { useRef, useEffect } from 'react';
import { Animated, Platform } from 'react-native';

const useStyleNative = (horizontal: boolean, scroll: number, scrollDuration: number) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: -scroll,
      duration: scrollDuration,
      useNativeDriver: true,
    }).start();
  }, [animation, scroll, scrollDuration]);

  return {
    transform: [horizontal ? { translateX: animation } : { translateY: animation }],
  };
};

const useStyleWeb = (horizontal: boolean, scroll: number, scrollDuration: number) => {
  return [
    {
      transform: [horizontal ? { translateX: -scroll } : { translateY: -scroll }],
    },
    {
      transitionDuration: `${scrollDuration}ms`,
      transitionProperty: 'transform',
      transitionTimingFunction: 'ease-out',
      transform: [horizontal ? { translateX: -scroll } : { translateY: -scroll }],
    },
  ];
};

export const useStyle = (horizontal: boolean, scroll: number, scrollDuration: number) => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- it's okay because Platform.OS is a constant
    return useStyleWeb(horizontal, scroll, scrollDuration);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks -- it's okay because Platform.OS is a constant
  return useStyleNative(horizontal, scroll, scrollDuration);
};
