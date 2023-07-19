import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SpatialNavigationVirtualizedList } from 'react-native-tv-spatial-navigation/src';
import { PROGRAM_PORTRAIT_HEIGHT } from '../atom/Program';
import { ProgramNode } from './ProgramNode';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 4;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;

export const VirtualizedSpatialList = ({
  numberOfItems,
  vertical,
  containerStyle,
}: {
  numberOfItems: number;
  vertical?: boolean;
  containerStyle?: object;
}) => {
  const renderItem = useCallback(() => <ProgramNode />, []);

  const hardcodedRabbitsArray = Array(numberOfItems).fill({});

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedList
        vertical={vertical}
        data={hardcodedRabbitsArray}
        renderItem={renderItem}
        itemSize={PROGRAM_PORTRAIT_HEIGHT + 50}
        numberOfRenderedItems={WINDOW_SIZE}
        numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: { height: 320 },
  column: { height: 700, width: 265 },
});

export const VirtualizedRow = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => (
  <VirtualizedSpatialList
    numberOfItems={numberOfItems}
    containerStyle={[containerStyle, styles.row]}
  />
);

export const VirtualizedColumn = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => (
  <VirtualizedSpatialList
    numberOfItems={numberOfItems}
    vertical
    containerStyle={[containerStyle, styles.column]}
  />
);
