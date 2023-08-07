import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TypeVirtualizedListAnimation } from '../../../types/TypeVirtualizedListAnimation';
import { computeTranslation } from '../helpers/computeTranslation';

export const useVirtualizedListAnimation: TypeVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  vertical = false,
  scrollBehavior,
  scrollDuration,
}) => {
  const translation = useRef<Animated.Value>(new Animated.Value(0)).current;
  const newTranslationValue = computeTranslation({
    currentlyFocusedItemIndex,
    itemSizeInPx,
    nbMaxOfItems,
    numberOfItemsVisibleOnScreen,
    scrollBehavior,
  });

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
  itemSizeInPx,
  nbMaxOfItems,
  numberOfItemsVisibleOnScreen,
  vertical = false,
  scrollBehavior,
  scrollDuration,
}) => {
  const animationDuration = `${scrollDuration}ms`;
  const newTranslationValue = computeTranslation({
    currentlyFocusedItemIndex,
    itemSizeInPx,
    nbMaxOfItems,
    numberOfItemsVisibleOnScreen,
    scrollBehavior,
  });

  return {
    transitionDuration: animationDuration,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
    transform: [
      vertical ? { translateY: newTranslationValue } : { translateX: newTranslationValue },
    ],
  };
};
