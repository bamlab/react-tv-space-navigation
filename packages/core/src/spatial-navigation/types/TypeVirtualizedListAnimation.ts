import { ViewStyle, Animated } from 'react-native';

export type TypeVirtualizedListAnimation = (args: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  vertical?: boolean;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollDuration: number;
}) => Animated.WithAnimatedValue<ViewStyle>;
