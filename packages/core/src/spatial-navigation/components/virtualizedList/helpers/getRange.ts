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
}: {
  data: Array<unknown>;
  currentlyFocusedItemIndex: number;
  numberOfRenderedItems?: number;
  numberOfItemsVisibleOnScreen: number;
}) => {
  const numberOfItemsNotVisible = numberOfRenderedItems - numberOfItemsVisibleOnScreen;

  /**
   * NumberOfItemsNotVisible should be > 2 in order to be sure to have an element mounted on the left in order to go left
   */
  if (numberOfItemsNotVisible < 2) {
    throw new Error(
      'You have set a numberOfRenderedItems inferior to the numberOfItemsVisibleOnScreen + 2 in your SpatialNavigationVirtualizedList. You must change it.',
    );
  }

  const halfNumberOfItemsNotVisible = numberOfItemsNotVisible / 2;
  const lastDataIndex = data.length - 1;

  const rawStartIndex = currentlyFocusedItemIndex - halfNumberOfItemsNotVisible;
  const rawEndIndex =
    currentlyFocusedItemIndex + halfNumberOfItemsNotVisible - 1 + numberOfItemsVisibleOnScreen;

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
}: {
  data: Array<unknown>;
  currentlyFocusedItemIndex: number;
  numberOfRenderedItems?: number;
  numberOfItemsVisibleOnScreen: number;
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
  });

  return { start: Math.ceil(result.start), end: Math.ceil(result.end) };
};
