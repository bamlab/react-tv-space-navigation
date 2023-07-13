import { ReactNode, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
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
  'data' | 'renderItem' | 'onEndReached' | 'style' | 'nbMaxOfItems'
> & {
  itemHeight: number;
  /** How many rows are RENDERED (virtualization size) */
  numberOfRenderedRows: number;
  /** How many rows are visible on screen (helps with knowing how to slice our data and to stop the scroll at the end of the list) */
  numberOfRowsVisibleOnScreen: number;
  /** Number of rows left to display before triggering onEndReached */
  onEndReachedThresholdRowsNumber?: number;
  numberOfColumns: number;
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

const GridRow = <T extends ItemWithIndex>({
  renderItem,
  numberOfColumns,
  row,
}: {
  renderItem: (args: { item: T }) => JSX.Element;
  numberOfColumns: number;
  row: GridRowType<T>;
}) => {
  const { getNthVirtualNodeID } = useRegisterGridRowVirtualNodes({ numberOfColumns });

  return (
    <HorizontalContainer>
      {row.items.map((item, index) => {
        return (
          /* The view is important to reset flex direction to vertical */
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
    ...props
  }: SpatialNavigationVirtualizedGridProps<T>) => {
    const gridRows = useMemo(() => convertToGrid(data, numberOfColumns), [data, numberOfColumns]);

    const renderRow = useCallback(
      ({ item: row }: { item: GridRowType<T> }) => (
        <GridRow renderItem={renderItem} numberOfColumns={numberOfColumns} row={row} />
      ),
      [renderItem, numberOfColumns],
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

type HorizontalContainerProps = {
  children: ReactNode;
};

const HorizontalContainer = ({ children }: HorizontalContainerProps) => {
  return <View style={styles.horizontalContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  horizontalContainer: { flexDirection: 'row' },
});
