import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TypeVirtualizedListAnimation } from '../../../types/TypeVirtualizedListAnimation';

export const useVirtualizedListAnimation: TypeVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  vertical = false,
  scrollDuration,
  scrollOffsetsArray,
}) => {
  const translation = useRef<Animated.Value>(new Animated.Value(0)).current;
  const newTranslationValue = scrollOffsetsArray[currentlyFocusedItemIndex];

  useEffect(() => {
    Animated.timing(translation, {
      toValue: newTranslationValue,
      duration: scrollDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.sin),
    }).start();
  }, [translation, newTranslationValue, scrollDuration]);

  return {
    transform: [vertical ? { translateY: translation } : { translateX: translation }],
  };
};

export const useWebVirtualizedListAnimation: TypeVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  vertical = false,
  scrollDuration,
  scrollOffsetsArray,
}) => {
  const animationDuration = `${scrollDuration}ms`;
  const newTranslationValue = scrollOffsetsArray[currentlyFocusedItemIndex];

  return {
    transitionDuration: animationDuration,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
    transform: [
      vertical ? { translateY: newTranslationValue } : { translateX: newTranslationValue },
    ],
  };
};
