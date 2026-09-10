import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TypeVirtualizedListAnimation } from '../../../types/TypeVirtualizedListAnimation';

export const useVirtualizedListAnimation: TypeVirtualizedListAnimation = ({
  currentlyFocusedItemIndex,
  vertical = false,
  mirrored = false,
  scrollDuration,
  scrollOffsetsArray,
}) => {
  const translation = useRef<Animated.Value>(new Animated.Value(0)).current;
  // The scroll offsets are computed as `-offset`, a slide to the left that
  // reveals the items on the right. On a mirrored layout the items stack
  // leftwards (see `ItemContainerWithAnimatedStyle`), so the container slides
  // to the right instead. Single injection point for the three scroll
  // behaviours; the non-mirrored path is unchanged.
  const scrollOffset = scrollOffsetsArray[currentlyFocusedItemIndex];
  const newTranslationValue = mirrored ? -scrollOffset : scrollOffset;

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
  mirrored = false,
  scrollDuration,
  scrollOffsetsArray,
}) => {
  const animationDuration = `${scrollDuration}ms`;
  // Same reasoning as the native hook above: react-native-web swaps `left` and
  // `right` when the writing direction of the subtree is right-to-left, so the
  // container slides the other way. The list is told through the `rtl` prop,
  // `I18nManager` carrying no direction on the web.
  const scrollOffset = scrollOffsetsArray[currentlyFocusedItemIndex];
  const newTranslationValue = mirrored ? -scrollOffset : scrollOffset;

  return {
    transitionDuration: animationDuration,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
    transform: [
      vertical ? { translateY: newTranslationValue } : { translateX: newTranslationValue },
    ],
  };
};
