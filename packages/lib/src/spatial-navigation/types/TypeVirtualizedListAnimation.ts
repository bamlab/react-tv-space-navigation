import { ViewStyle, Animated } from 'react-native';

export type TypeVirtualizedListAnimation = (args: {
  currentlyFocusedItemIndex: number;
  vertical?: boolean;
  /** Horizontal list laid out for a mirrored layout. */
  mirrored?: boolean;
  scrollDuration: number;
  scrollOffsetsArray: number[];
}) => Animated.WithAnimatedValue<ViewStyle>;
