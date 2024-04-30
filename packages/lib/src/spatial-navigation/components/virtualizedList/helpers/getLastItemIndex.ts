/**
 * This function is used to compute the index of the last item that allows the end of the list to fully fit in the screen.
 * It is used when scrolling on stick-to-start mode.
 *
 * ```
 *      ┌───────────────────────────────────────┐
 *      │                Screen                 │
 *      │                                       │
 *      │                                       │
 *  ┌───┼─┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ │
 *  │  3│ │  │  4  │  │  5  │  │  6  │  │  7  │ │
 *  │┌──┼┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│ │
 *  ││ C│││  ││ D ││  ││ E ││  ││ F ││  ││ G ││ │
 *  │└──┼┘│  │└───┘│  │└───┘│  │└───┘│  │└───┘│ │
 *  └───┼─┘  └─────┘  └─────┘  └─────┘  └─────┘ │
 *      │                                       │
 *      └───────────────────────────────────────┘
 * ```
 *
 * In this case the last item that allows the end of the list to fully fit in the screen is item 4, so the
 * scroll in stick-to-start mode will be stopped after item 4, to keep
 * item 4 to 7 in the screen.
 *
 */
export const getLastLeftItemIndex = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  listSizeInPx: number,
): number => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;

    for (let index = data.length - 1; index >= 0; index--) {
      totalSize += itemSizeInPx(data[index]);

      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item (list is iterated backwards, so index + 1)
        return index + 1;
      }
    }

    return 0;
  }

  const result = data.length - Math.floor(listSizeInPx / itemSizeInPx);

  if (result < 0) {
    return 0;
  }
  return result;
};

/**
 *
 * This function is used to compute the index of the last item that fits in the screen when at the beginning of a list.
 * It is used when scrolling on stick-to-end mode to know when to start or stop scrolling
 *
 * ```
 *  ┌───────────────────────────────────────┐
 *  │                Screen                 │
 *  │                                       │
 *  │                                       │
 *  │ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─┼───┐
 *  │ │  1  │  │  2  │  │  3  │  │  4  │  │ │5  │
 *  │ │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌┼──┐│
 *  │ ││ A ││  ││ B ││  ││ C ││  ││ D ││  │││E ││
 *  │ │└───┘│  │└───┘│  │└───┘│  │└───┘│  │└┼──┘│
 *  │ └─────┘  └─────┘  └─────┘  └─────┘  └─┼───┘
 *  │                                       │
 *  └───────────────────────────────────────┘
 * ```
 *
 * In this case the last item that fits in the screen is item 4, so the
 * scroll in stick-to-end mode will be computed after item 4, to keep
 * item 5 (and the followings) on the right of the screen.
 *
 */
export const getLastRightItemIndex = <T>(
  data: T[],
  itemSizeInPx: number | ((item: T) => number),
  listSizeInPx: number,
): number => {
  if (typeof itemSizeInPx === 'function') {
    let totalSize = 0;

    for (let index = 0; index < data.length; index++) {
      totalSize += itemSizeInPx(data[index]);

      if (totalSize >= listSizeInPx) {
        // If we exceed the list size, we return the index of the previous item
        return index - 1;
      }
    }

    return data.length - 1;
  }
  const result = Math.floor(listSizeInPx / itemSizeInPx) - 1;

  if (result > data.length - 1) {
    // We substract 1 because index starts from 0
    return data.length - 1;
  }
  return result;
};
