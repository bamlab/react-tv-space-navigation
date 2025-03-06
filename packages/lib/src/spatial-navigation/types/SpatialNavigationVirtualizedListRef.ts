export type SpatialNavigationVirtualizedListRef = {
  focus: (index: number) => void;
  scrollTo: (index: number) => void;
  currentlyFocusedItemIndex: number;
};
