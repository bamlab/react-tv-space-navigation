import { ReactNode, useCallback, useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import range from 'lodash/range';

import { ItemWithIndex } from '../virtualizedList/VirtualizedList';
import { SpatialNavigationVirtualizedList } from '../virtualizedList/SpatialNavigationVirtualizedList';
import { SpatialNavigationVirtualizedListWithScrollProps } from '../virtualizedList/SpatialNavigationVirtualizedListWithScroll';
import { useSpatialNavigator } from '../../context/SpatialNavigatorContext';
import { ParentIdContext, useParentId } from '../../context/ParentIdContext';
import { useBeforeMountEffect } from '../../hooks/useBeforeMountEffect';
import { typedMemo } from '../../helpers/TypedMemo';
import { convertToGrid } from './helpers/convertToGrid';

type SpatialNavigationVirtualizedGridProps<T extends ItemWithIndex> = Pick<
  SpatialNavigationVirtualizedListWithScrollProps<T>,
  | 'data'
  | 'renderItem'
  | 'onEndReached'
  | 'style'
  | 'nbMaxOfItems'
  | 'scrollBehavior'
  | 'scrollDuration'
  | 'testID'
> & {
  itemHeight: number;
  /** How many rows are RENDERED (virtualization size) */
  numberOfRenderedRows: number;
  /** How many rows are visible on screen (helps with knowing how to slice our data and to stop the scroll at the end of the list) */
  numberOfRowsVisibleOnScreen: number;
  /** Number of rows left to display before triggering onEndReached */
  onEndReachedThresholdRowsNumber?: number;
  /** Number of columns in the grid OR number of items per rows */
  numberOfColumns: number;
  /** Used to modify every row style */
  rowContainerStyle?: ViewStyle;
};

export type GridRowType<T extends ItemWithIndex> = {
  items: T[];
  index: number;
};

const useRegisterGridRowVirtualNodes = ({ numberOfColumns }: { numberOfColumns: number }) => {
  const spatialNavigator = useSpatialNavigator();
  const parentId = useParentId();

  const getNthVirtualNodeID = useCallback((index: number) => `${parentId}_${index}`, [parentId]);

  // This function must be idempotent so we don't register existing nodes again when grid data changes
  const registerNthVirtualNode = useCallback(
    (index: number) => {
      return spatialNavigator.registerNode(getNthVirtualNodeID(index), {
        parent: parentId,
        orientation: 'horizontal',
        isFocusable: false,
        /** This prop enables index synchronization for navigation between rows.
         * Thus you can navigate up and down inside columns, instead of going back to the first element of rows.
         */
        useMeForIndexAlign: true,
      });
    },
    [spatialNavigator, parentId, getNthVirtualNodeID],
  );

  const unregisterNthVirtualNode = useCallback(
    (index: number) => {
      return spatialNavigator.unregisterNode(getNthVirtualNodeID(index));
    },
    [spatialNavigator, getNthVirtualNodeID],
  );

  useBeforeMountEffect(() => {
    range(numberOfColumns).forEach((i) => registerNthVirtualNode(i));
    return () => range(numberOfColumns).forEach((i) => unregisterNthVirtualNode(i));
  }, [parentId]);

  return { getNthVirtualNodeID };
};

const ItemWrapperWithVirtualParentContext = typedMemo(
  <T extends ItemWithIndex>({
    virtualParentID,
    item,
    renderItem,
  }: {
    virtualParentID: string;
    item: T;
    renderItem: (args: { item: T }) => JSX.Element;
  }) => (
    <ParentIdContext.Provider value={virtualParentID}>
      {renderItem({ item })}
    </ParentIdContext.Provider>
  ),
);
ItemWrapperWithVirtualParentContext.displayName = 'ItemWrapperWithVirtualParentContext';

const GridRow = <T extends ItemWithIndex>({
  renderItem,
  numberOfColumns,
  row,
  rowContainerStyle,
}: {
  renderItem: (args: { item: T }) => JSX.Element;
  numberOfColumns: number;
  row: GridRowType<T>;
  rowContainerStyle?: ViewStyle;
}) => {
  const { getNthVirtualNodeID } = useRegisterGridRowVirtualNodes({ numberOfColumns });

  return (
    <HorizontalContainer style={rowContainerStyle}>
      {row.items.map((item, index) => {
        return (
          /* This view is important to reset flex direction to vertical */
          <View key={index}>
            <ItemWrapperWithVirtualParentContext
              virtualParentID={getNthVirtualNodeID(index)}
              renderItem={renderItem}
              item={item}
            />
          </View>
        );
      })}
    </HorizontalContainer>
  );
};

/**
 * Use this component to render spatially navigable grids of items.
 * Grids only support vertical orientation (vertically scrollable),
 * but you can navigate between elements in any direction.
 *
 * A grid is a series of horizontal rows rendering 'numberOfColumns' items.
 *
 * ```
 * ┌───────────────────────────────────────────────────┐
 * │                  Screen                           │
 * │                                                   │
 * │ ┌───────────────────────────────────────────────┐ │
 * │ │ Row1                                          │ │
 * │ │                                               │ │
 * │ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ │  A   │ │  B   │ │  C   │ │  D   │ │   E  │  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │ │
 * │ │                                               │ │
 * │ └───────────────────────────────────────────────┘ │
 * │                                                   │
 * │ ┌───────────────────────────────────────────────┐ │
 * │ │ Row2                                          │ │
 * │ │                                               │ │
 * │ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ │   A  │ │  B   │ │  C   │ │  D   │ │  E   │  │ │
 * │ │ │      │ │      │ │      │ │      │ │      │  │ │
 * │ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │ │
 * │ │                                               │ │
 * │ └───────────────────────────────────────────────┘ │
 * │                                                   │
 * └───────────────────────────────────────────────────┘
 *   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
 *     Row3                                          │
 *   │
 *     ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
 *   │ │      │ │      │ │      │ │      │ │      │
 *     │   A  │ │  B   │ │  C   │ │  D   │ │  E   │  │
 *   │ │      │ │      │ │      │ │      │ │      │
 *     └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
 *   │
 *   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
 * ```
 * The row framed in dotted lines corresponds to a virtualized component.
 * There is no virtualization inside rows.
 */

export const SpatialNavigationVirtualizedGrid = typedMemo(
  <T extends ItemWithIndex>({
    renderItem,
    data,
    numberOfColumns,
    itemHeight,
    numberOfRenderedRows,
    numberOfRowsVisibleOnScreen,
    onEndReachedThresholdRowsNumber,
    nbMaxOfItems,
    rowContainerStyle,
    ...props
  }: SpatialNavigationVirtualizedGridProps<T>) => {
    const gridRows = useMemo(() => convertToGrid(data, numberOfColumns), [data, numberOfColumns]);

    const renderRow = useCallback(
      ({ item: row }: { item: GridRowType<T> }) => (
        <GridRow
          renderItem={renderItem}
          numberOfColumns={numberOfColumns}
          row={row}
          rowContainerStyle={rowContainerStyle}
        />
      ),
      [renderItem, numberOfColumns, rowContainerStyle],
    );

    return (
      <SpatialNavigationVirtualizedList
        data={gridRows}
        itemSize={itemHeight}
        numberOfRenderedItems={numberOfRenderedRows}
        numberOfItemsVisibleOnScreen={numberOfRowsVisibleOnScreen}
        onEndReachedThresholdItemsNumber={onEndReachedThresholdRowsNumber}
        orientation="vertical"
        nbMaxOfItems={nbMaxOfItems ? Math.ceil(nbMaxOfItems / numberOfColumns) : undefined}
        renderItem={renderRow}
        isGrid
        {...props}
      />
    );
  },
);
SpatialNavigationVirtualizedGrid.displayName = 'SpatialNavigationVirtualizedGrid';

type HorizontalContainerProps = {
  style?: ViewStyle;
  children: ReactNode;
};

const HorizontalContainer = ({ style, children }: HorizontalContainerProps) => {
  return <View style={[style, styles.rowContainer]}>{children}</View>;
};

const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row' },
});
