import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import { SpatialNavigationVirtualizedGrid } from 'react-native-tv-spatial-navigation/src';
import { PROGRAM_HEIGHT } from './Program';
import { SimpleNode } from './SimpleNode';

const NUMBER_OF_ROWS_VISIBLE_ON_SCREEN = 2;
const NUMBER_OF_RENDERED_ROWS = NUMBER_OF_ROWS_VISIBLE_ON_SCREEN + 6;
const NUMBER_OF_COLUMNS = 6;
const INFINITE_SCROLL_ROW_THRESHOLD = 2;

export const VirtualizedSpatialGrid = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => {
  const renderItem = useCallback(() => <SimpleNode />, []);

  const hardcodedRabbitsArray = Array(numberOfItems).fill({});

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedGrid
        data={hardcodedRabbitsArray}
        renderItem={renderItem}
        itemHeight={PROGRAM_HEIGHT}
        numberOfColumns={NUMBER_OF_COLUMNS}
        numberOfRenderedRows={NUMBER_OF_RENDERED_ROWS}
        numberOfRowsVisibleOnScreen={NUMBER_OF_ROWS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdRowsNumber={INFINITE_SCROLL_ROW_THRESHOLD}
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
});
