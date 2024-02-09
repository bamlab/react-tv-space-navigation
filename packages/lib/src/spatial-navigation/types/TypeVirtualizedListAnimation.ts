import { ViewStyle, Animated } from 'react-native';

export type TypeVirtualizedListAnimation = (args: {
  currentlyFocusedItemIndex: number;
  vertical?: boolean;
  scrollDuration: number;
  scrollOffsetsArray: number[];
}) => Animated.WithAnimatedValue<ViewStyle>;
