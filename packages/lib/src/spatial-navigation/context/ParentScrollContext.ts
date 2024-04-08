import { createContext, RefObject, useContext } from 'react';
import { View } from 'react-native';

export type ScrollToNodeCallback = (ref: RefObject<View>, additionalOffset?: number) => void;
export const SpatialNavigatorParentScrollContext = createContext<ScrollToNodeCallback>(() => {});

export const useSpatialNavigatorParentScroll = (): {
  scrollToNodeIfNeeded: ScrollToNodeCallback;
} => {
  const scrollToNodeIfNeeded = useContext(SpatialNavigatorParentScrollContext);
  return { scrollToNodeIfNeeded };
};
