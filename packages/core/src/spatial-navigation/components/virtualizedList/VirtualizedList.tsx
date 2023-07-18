import { useCallback, useEffect, useMemo } from 'react';
import { Animated, StyleSheet, View, ViewStyle, Dimensions, Platform } from 'react-native';
import { getRange } from './helpers/getRange';
import {
  useVirtualizedListAnimation,
  useWebVirtualizedListAnimation,
} from './hooks/useVirtualizedListAnimation';
import { typedMemo } from '../../helpers/TypedMemo';

const screen = Dimensions.get('window');

/**
 * @TODO: VirtualizedList should be able to take any data as params.
 * We shouldn't restrict the use to a data that is indexed -> a mistake can be made on usage
 * if the data is not indexed properly for example.
 * The indexing should be done inside VirtualizedList directly & VirtualizedListProps
 * should accept any generic type T.
 */
export type ItemWithIndex = { index: number };

export interface VirtualizedListProps<T> {
  data: Array<T>;
  renderItem: (args: { item: T }) => JSX.Element;
  /** If vertical the height of an item, otherwise the width */
  itemSize: number;
  currentlyFocusedItemIndex: number;
  /** How many items are RENDERED (virtualization size) */
  numberOfRenderedItems: number;
  /** How many items are visible on screen (helps with knowing how to slice our data and to stop the scroll at the end of the list) */
  numberOfItemsVisibleOnScreen: number;
  vertical?: boolean;
  style?: ViewStyle;
  onEndReached?: () => void;
  /** Number of items left to display before triggering onEndReached */
  onEndReachedThresholdItemsNumber?: number;
  /**
   * @deprecated
   * Use a custom key instead of the recycling.
   * */
  keyExtractor?: (index: number) => string;
  /** Total number of expected items for infinite scroll (helps aligning items) used for pagination */
  nbMaxOfItems?: number;
  /** Duration of a scrolling animation inside the VirtualizedList */
  scrollDuration?: number;
  /** Custom height for the VirtualizedList container */
  height?: number;
  /** Custom width for the VirtualizedList container */
  width?: number;
}

const useOnEndReached = ({
  numberOfItems,
  range,
  currentlyFocusedItemIndex,
  onEndReachedThresholdItemsNumber,
  onEndReached,
}: {
  numberOfItems: number;
  range: { start: number; end: number };
  currentlyFocusedItemIndex: number;
  onEndReachedThresholdItemsNumber: number;
  onEndReached: (() => void) | undefined;
}) => {
  useEffect(() => {
    if (numberOfItems === 0 || range.end === 0) {
      return;
    }

    if (
      currentlyFocusedItemIndex ===
      Math.max(numberOfItems - 1 - onEndReachedThresholdItemsNumber, 0)
    ) {
      onEndReached?.();
    }
  }, [
    onEndReached,
    range.end,
    currentlyFocusedItemIndex,
    onEndReachedThresholdItemsNumber,
    numberOfItems,
  ]);
};

const ItemContainerWithAnimatedStyle = typedMemo(
  <T extends ItemWithIndex>({
    item,
    renderItem,
    itemSize,
    vertical,
  }: {
    item: T;
    renderItem: VirtualizedListProps<T>['renderItem'];
    itemSize: number;
    vertical: boolean;
  }) => {
    const style = useMemo(
      () =>
        StyleSheet.flatten([
          styles.item,
          vertical
            ? { transform: [{ translateY: item.index * itemSize }] }
            : { transform: [{ translateX: item.index * itemSize }] },
        ]),
      [item.index, itemSize, vertical],
    );
    return <View style={style}>{renderItem({ item })}</View>;
  },
);

/**
 * DO NOT use this component directly !
 * You should use the component SpatialNavigationVirtualizedList.tsx to render navigable lists of components.
 *
 * Why this has been made:
 *   - it gives us full control on the way we scroll (using CSS animations)
 *   - it is way more performant than a FlatList
 */
export const VirtualizedList = typedMemo(
  <T extends ItemWithIndex>({
    data,
    renderItem,
    itemSize,
    currentlyFocusedItemIndex,
    numberOfRenderedItems,
    numberOfItemsVisibleOnScreen,
    vertical = false,
    style,
    onEndReached,
    onEndReachedThresholdItemsNumber = 3,
    nbMaxOfItems,
    keyExtractor,
    scrollDuration = 200,
    height = screen.height,
    width = screen.width,
  }: VirtualizedListProps<T>) => {
    const range = getRange({
      data,
      currentlyFocusedItemIndex,
      numberOfRenderedItems,
      numberOfItemsVisibleOnScreen,
    });

    const dataSliceToRender = data.slice(range.start, range.end + 1);

    useOnEndReached({
      numberOfItems: data.length,
      range,
      currentlyFocusedItemIndex,
      onEndReachedThresholdItemsNumber,
      onEndReached,
    });

    const animatedStyle =
      Platform.OS === 'web'
        ? useWebVirtualizedListAnimation({
            currentlyFocusedItemIndex,
            itemSizeInPx: itemSize,
            vertical,
            nbMaxOfItems: nbMaxOfItems ?? data.length,
            numberOfItemsVisibleOnScreen,
            scrollDuration,
          })
        : useVirtualizedListAnimation({
            currentlyFocusedItemIndex,
            itemSizeInPx: itemSize,
            vertical,
            nbMaxOfItems: nbMaxOfItems ?? data.length,
            numberOfItemsVisibleOnScreen,
            scrollDuration,
          });

    /*
     * This is a performance trick.
     * This custom key with a modulo is actually a "recycled" list implementation.
     *
     * Normally, if I scroll right, the first element needs to be unmounted and a new one needs to be mounted on the right side.
     * But with recycling, the first element won't be unmounted : it is moved to the end and its props are updated.
     * See https://medium.com/@moshe_31114/building-our-recycle-list-solution-in-react-17a21a9605a0  */
    const recycledKeyExtractor = useCallback(
      (index: number) => `recycled_item_${index % numberOfRenderedItems}`,
      [numberOfRenderedItems],
    );

    const directionStyle = useMemo(
      () => ({ flexDirection: vertical ? 'column' : 'row' } as const),
      [vertical],
    );

    /**
     * If the view has the size of the screen, then it is dropped in the component hierarchy when scrolled for more than the screen size (scroll right).
     * To ensure that the view stays visible, we adat its size to the size of the virtualized list.
     * ```
     *                        Screen
     *                  ┌─────────────────────┐
     *  View(container) │                     │
     *        ┌─────────┼───────────────────┐ │
     *        │┌─┬─┬─┬─┬┼┬─┬─┬─┬─┬─┬─┬─┬─┬──┤ │
     *        ││┼│ │┼│ │┼│ │┼│ │┼│ │┼│ │┼│  │ │
     *        │└─┴─┴─┴─┴┼┴─┴─┴─┴─┴─┴─┴─┴─┴──┤ │
     *        └─────────┼───────────────────┘ │
     *                  │                     │
     *                  └─────────────────────┘
     *          ◄───────┼───────────────────►
     *   RowWidth = Screen Width + size of the item on left
     * ```
     */

    const dimensionStyle = useMemo(
      () =>
        vertical
          ? ({
              height: height + itemSize * currentlyFocusedItemIndex,
            } as const)
          : ({ width: width + itemSize * currentlyFocusedItemIndex } as const),
      [height, width, itemSize, currentlyFocusedItemIndex, vertical],
    );

    return (
      <Animated.View
        style={[styles.container, animatedStyle, style, directionStyle, dimensionStyle]}
      >
        <View>
          {dataSliceToRender.map((item) => {
            return (
              <ItemContainerWithAnimatedStyle<T>
                key={keyExtractor ? keyExtractor(item.index) : recycledKeyExtractor(item.index)}
                renderItem={renderItem}
                item={item}
                itemSize={itemSize}
                vertical={vertical}
              />
            );
          })}
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    left: 0,
    position: 'absolute',
  },
});
