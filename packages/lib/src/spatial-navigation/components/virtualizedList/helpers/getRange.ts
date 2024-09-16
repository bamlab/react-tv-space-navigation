import { ScrollBehavior } from '../VirtualizedList';

const positiveValueOrZero = (x: number): number => Math.max(x, 0);

/**
 * ```
 *                                 numberOfItemsVisibleOnScreen
 *                          <╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴>
 *                          ┌─────────────────────────────────────────┐
 * ┌╴╴╴╴╴╴╴┐     ┌───────┐  │  ╔═══════╗     ┌───────┐     ┌───────┐  │  ┌───────┐     ┌╴╴╴╴╴╴╴┐
 * ╎       ╎     │       │  │  ║       ║     │       │     │       │  │  │       │     ╎       ╎
 * ╎       ╎────►│ start ├──┼─►║focused║────►│       ├────►│       ├──┼─►│  end  ├────►╎       ╎
 * ╎       ╎     │       │  │  ║       ║     │       │     │       │  │  │       │     ╎       ╎
 * └╴╴╴╴╴╴╴┘     └───────┘  │  ╚═══════╝     └───────┘     └───────┘  │  └───────┘     └╴╴╴╴╴╴╴┘
 *                          └─────────────────────────────────────────┘
 *               <╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴>
 *                                     numberOfRenderedItems
 * ```
 **/
const getRangeWithoutFloatHandling = ({
  data,
  currentlyFocusedItemIndex,
  numberOfRenderedItems = 8,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
}: {
  data: Array<unknown>;
  currentlyFocusedItemIndex: number;
  numberOfRenderedItems?: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
}) => {
  const numberOfItemsNotVisible = numberOfRenderedItems - numberOfItemsVisibleOnScreen;

  const lastDataIndex = data.length - 1;

  const { rawStartIndex, rawEndIndex } = getRawStartAndEndIndexes({
    currentlyFocusedItemIndex,
    numberOfItemsVisibleOnScreen,
    numberOfItemsNotVisible,
    scrollBehavior,
  });

  /*
   * if sum does not fit the window size, then we are in of these cases:
   * - at the beginning of the data
   * - at the end of the data
   * - or we have too few data
   */
  if (rawStartIndex < 0) {
    const finalEndIndex = numberOfRenderedItems - 1;

    return { start: 0, end: positiveValueOrZero(Math.min(finalEndIndex, lastDataIndex)) };
  }

  if (rawEndIndex > data.length - 1) {
    const finalStartIndex = lastDataIndex - numberOfRenderedItems + 1;

    return { start: positiveValueOrZero(finalStartIndex), end: positiveValueOrZero(lastDataIndex) };
  }

  return { start: rawStartIndex, end: rawEndIndex };
};

/**
 * Computes the raw start and end indexes for the virtualization.
 * "raw" means that the indexes are subject to be out of bounds
 * which will be handled in the getRange function.
 */
const getRawStartAndEndIndexes = ({
  currentlyFocusedItemIndex,
  numberOfItemsVisibleOnScreen,
  numberOfItemsNotVisible,
  scrollBehavior,
}: {
  currentlyFocusedItemIndex: number;
  numberOfItemsVisibleOnScreen: number;
  numberOfItemsNotVisible: number;
  scrollBehavior: ScrollBehavior;
}) => {
  const halfNumberOfItemsNotVisible = numberOfItemsNotVisible / 2;

  switch (scrollBehavior) {
    case 'stick-to-start':
      return {
        rawStartIndex: currentlyFocusedItemIndex - halfNumberOfItemsNotVisible,
        rawEndIndex:
          currentlyFocusedItemIndex +
          numberOfItemsVisibleOnScreen -
          1 +
          halfNumberOfItemsNotVisible,
      };
    case 'stick-to-end':
      return {
        rawStartIndex:
          currentlyFocusedItemIndex -
          numberOfItemsVisibleOnScreen +
          1 -
          halfNumberOfItemsNotVisible,
        rawEndIndex: currentlyFocusedItemIndex + halfNumberOfItemsNotVisible,
      };
    case 'jump-on-scroll':
      return {
        rawStartIndex: currentlyFocusedItemIndex - (halfNumberOfItemsNotVisible + 1),
        rawEndIndex: currentlyFocusedItemIndex + (halfNumberOfItemsNotVisible + 1),
      };
    default:
      throw new Error(`Unknown scroll behavior: ${scrollBehavior}`);
  }
};

/**
 * Computes an array slice for virtualization
 * Have a look at the tests to get examples!
 *
 * The tricky part is that we handle cases were the data is smaller than the window,
 * or when we are on the beginning of the screen...
 */
export const getRange = ({
  data,
  currentlyFocusedItemIndex,
  numberOfRenderedItems = 8,
  numberOfItemsVisibleOnScreen,
  scrollBehavior,
}: {
  data: Array<unknown>;
  currentlyFocusedItemIndex: number;
  numberOfRenderedItems?: number;
  numberOfItemsVisibleOnScreen: number;
  scrollBehavior: ScrollBehavior;
}): { start: number; end: number } => {
  if (numberOfRenderedItems <= 0) {
    console.error(
      '[VirtualizedList] Negative number of rendered items was given, no elements will be rendered',
    );
    return { start: 0, end: 0 };
  }

  const result = getRangeWithoutFloatHandling({
    data,
    currentlyFocusedItemIndex,
    numberOfRenderedItems,
    numberOfItemsVisibleOnScreen,
    scrollBehavior,
  });

  return { start: Math.ceil(result.start), end: Math.ceil(result.end) };
};
