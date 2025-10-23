import { RefObject } from 'react';
import { View } from 'react-native';

export type SpatialNavigationFocusableViewRef = {
  focus: () => void;
  viewRef: RefObject<View | null>;
};
