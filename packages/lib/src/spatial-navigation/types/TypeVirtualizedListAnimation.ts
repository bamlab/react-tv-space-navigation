import { ViewStyle, Animated } from 'react-native';
import { ScrollBehavior } from '../components/virtualizedList/VirtualizedList';

export type TypeVirtualizedListAnimation = (args: {
  currentlyFocusedItemIndex: number;
  itemSizeInPx: number;
  vertical?: boolean;
  nbMaxOfItems: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
  scrollDuration: number;
}) => Animated.WithAnimatedValue<ViewStyle>;
