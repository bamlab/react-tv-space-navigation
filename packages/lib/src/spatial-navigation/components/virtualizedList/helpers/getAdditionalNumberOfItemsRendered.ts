import { ScrollBehavior } from '../VirtualizedList';

export const getAdditionalNumberOfItemsRendered = (
  scrollBehavior: ScrollBehavior,
  numberOfElementsVisibleOnScreen: number,
) => {
  switch (scrollBehavior) {
    case 'stick-to-start':
    case 'stick-to-end':
      return 4 + numberOfElementsVisibleOnScreen;
    case 'jump-on-scroll':
      return 2 * numberOfElementsVisibleOnScreen + 1;
  }
};
