import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import range from 'lodash/range';

import { SpatialNavigationVirtualizedList } from '../virtualizedList/SpatialNavigationVirtualizedList';
import {
  PointerScrollProps,
  SpatialNavigationVirtualizedListWithScrollProps,
} from '../virtualizedList/SpatialNavigationVirtualizedListWithScroll';
import { useSpatialNavigator } from '../../context/SpatialNavigatorContext';
import { ParentIdContext, useParentId } from '../../context/ParentIdContext';
import { typedMemo } from '../../helpers/TypedMemo';
import { convertToGrid } from './helpers/convertToGrid';

type SpatialNavigationVirtualizedGridProps<T> = Pick<
  SpatialNavigationVirtualizedListWithScrollProps<T>,
  | 'data'
  | 'renderItem'
  | 'onEndReached'
  | 'style'
  | 'nbMaxOfItems'
  | 'scrollBehavior'
  | 'scrollDuration'
  | 'testID'
> &
  PointerScrollProps & {
    itemHeight: number;
    header?: JSX.Element;
    headerSize?: number;
    /** How many rows are RENDERED ADDITIONALLY to those already visible (impacts virtualization size) */
    additionalRenderedRows?: number;
    /** Number of rows left to display before triggering onEndReached */
    onEndReachedThresholdRowsNumber?: number;
    /** Number of columns in the grid OR number of items per rows */
    numberOfColumns: number;
    /** Used to modify every row style */
    rowContainerStyle?: ViewStyle;
  };

export type GridRowType<T> = {
  items: T[];
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

  useEffect(() => {
    range(numberOfColumns).forEach((i) => registerNthVirtualNode(i));
    return () => range(numberOfColumns).forEach((i) => unregisterNthVirtualNode(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
  }, [parentId]);

  return { getNthVirtualNodeID };
};

const ItemWrapperWithVirtualParentContext = typedMemo(
  <T,>({
    virtualParentID,
    item,
    index,
    renderItem,
  }: {
    virtualParentID: string;
    item: T;
    index: number;
    renderItem: (args: { item: T; index: number }) => JSX.Element;
  }) => (
    <ParentIdContext.Provider value={virtualParentID}>
      {renderItem({ item, index })}
    </ParentIdContext.Provider>
  ),
);
ItemWrapperWithVirtualParentContext.displayName = 'ItemWrapperWithVirtualParentContext';

const GridRow = <T,>({
  renderItem,
  numberOfColumns,
  row,
  rowIndex,
  rowContainerStyle,
}: {
  renderItem: (args: { item: T; index: number }) => JSX.Element;
  numberOfColumns: number;
  row: GridRowType<T>;
  rowIndex: number;
  rowContainerStyle?: ViewStyle;
}) => {
  const { getNthVirtualNodeID } = useRegisterGridRowVirtualNodes({ numberOfColumns });

  return (
    <HorizontalContainer style={rowContainerStyle}>
      {row.items.map((item, columnIndex) => {
        const itemIndex = rowIndex * numberOfColumns + columnIndex;
        return (
          /* This view is important to reset flex direction to vertical */
          <View key={columnIndex}>
            <ItemWrapperWithVirtualParentContext
              virtualParentID={getNthVirtualNodeID(columnIndex)}
              renderItem={renderItem}
              item={item}
              index={itemIndex}
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
  <T,>({
    renderItem,
    data,
    numberOfColumns,
    itemHeight,
    header,
    headerSize,
    additionalRenderedRows,
    onEndReachedThresholdRowsNumber,
    nbMaxOfItems,
    rowContainerStyle,
    ...props
  }: SpatialNavigationVirtualizedGridProps<T>) => {
    if (header && !headerSize) throw new Error('You must provide a headerSize when using a header');
    if (headerSize && !header) throw new Error('You must provide a header when using a headerSize');
    const hasHeader = !!header && !!headerSize;

    const gridRows = useMemo(
      () => convertToGrid(data, numberOfColumns, header),
      [data, header, numberOfColumns],
    );
    const gridRowsWithHeaderIfProvided = useMemo(
      () => (hasHeader ? [header, ...gridRows] : gridRows),
      [hasHeader, header, gridRows],
    );

    const itemSizeAsAFunction = useCallback(
      (item: GridRowType<T> | JSX.Element) => {
        if (hasHeader && React.isValidElement(item)) {
          return headerSize;
        }
        return itemHeight;
      },
      [hasHeader, headerSize, itemHeight],
    );

    const itemSize = hasHeader ? itemSizeAsAFunction : itemHeight;

    const renderRow = useCallback(
      ({ item: row, index }: { item: GridRowType<T>; index: number }) => (
        <GridRow
          renderItem={renderItem}
          numberOfColumns={numberOfColumns}
          row={row}
          rowIndex={index}
          rowContainerStyle={rowContainerStyle}
        />
      ),
      [renderItem, numberOfColumns, rowContainerStyle],
    );
    const renderHeaderThenRows = useCallback(
      ({ item, index }: { item: GridRowType<T> | JSX.Element; index: number }) => {
        if (React.isValidElement(item)) {
          return item;
        }
        //We do this to have index taking into account the header
        const computedIndex = hasHeader ? index - 1 : index;
        return renderRow({ item: item as GridRowType<T>, index: computedIndex });
      },
      [hasHeader, renderRow],
    );

    return (
      <SpatialNavigationVirtualizedList
        data={gridRowsWithHeaderIfProvided}
        itemSize={itemSize}
        additionalItemsRendered={additionalRenderedRows}
        onEndReachedThresholdItemsNumber={onEndReachedThresholdRowsNumber}
        orientation="vertical"
        nbMaxOfItems={nbMaxOfItems ? Math.ceil(nbMaxOfItems / numberOfColumns) : undefined}
        renderItem={renderHeaderThenRows}
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
