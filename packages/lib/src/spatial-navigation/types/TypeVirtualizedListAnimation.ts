import { ViewStyle, Animated } from 'react-native';
import { ScrollBehavior } from '../components/virtualizedList/VirtualizedList';

export type TypeVirtualizedListAnimation = <T>(args: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number | ((item: T) => number);
  vertical?: boolean;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
  scrollDuration: number;
  data: T[];
  listSizeInPx: number;
  maxPossibleLeftAlignedIndex: number;
  maxPossibleRightAlignedIndex: number;
}) => Animated.WithAnimatedValue<ViewStyle>;
