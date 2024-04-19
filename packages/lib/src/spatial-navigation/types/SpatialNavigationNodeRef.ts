export type SpatialNavigationNodeRef = {
  /**
   * Imperatively grab the focus on the node.
   */
  focus: () => void;
  /**
   * Scroll to a given node, without grabbing the focus.
   * https://github.com/bamlab/react-tv-space-navigation/issues/106
   */
  triggerScroll: () => void;
};
