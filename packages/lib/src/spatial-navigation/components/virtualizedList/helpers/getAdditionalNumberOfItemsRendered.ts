import { ScrollBehavior } from '../VirtualizedList';

/**
 * If list rendered elements is too small, it creates spatial navigation bugs
 * like not being able to go back on the left
 *
 * There are other ways to fix this than forcing a minimum number of additional items to render
 * but having a minimum number items to render inferior to the window size makes no sense anyway
 */
const MINIMUM_ADDITIONAL_ITEMS_TO_WORK = 2;

export const getAdditionalNumberOfItemsRendered = (
  scrollBehavior: ScrollBehavior,
  numberOfElementsVisibleOnScreen: number,
  additionalNumberOfItemsRendered: number,
) => {
  if (additionalNumberOfItemsRendered < 0) {
    console.error(
      '[VirtualizedList] Negative number of additional items to render was given, no elements will be rendered',
    );
  }

  switch (scrollBehavior) {
    case 'jump-on-scroll':
      // This is a special case
      // Since we're jumping on scroll, we need to render more items to make sure that a whole
      // window is ready when we jump!
      return 2 * numberOfElementsVisibleOnScreen + 1 + additionalNumberOfItemsRendered;
    default:
      return (
        numberOfElementsVisibleOnScreen +
        MINIMUM_ADDITIONAL_ITEMS_TO_WORK +
        additionalNumberOfItemsRendered
      );
  }
};
