import {StyleSheet, View} from 'react-native';

import {SpatialNavigatorVirtualizedList} from 'react-native-tv-spatial-navigation/src';

import {useCallback} from 'react';
import {PROGRAM_HEIGHT} from './Program';
import {SimpleNode} from './SimpleNode';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 4;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;

export const Row = ({numberOfItems}: {numberOfItems: number}) => {
  const renderItem = useCallback(() => <SimpleNode />, []);

  const indexes = Array.from(Array(numberOfItems).keys()).map(value => {
    return {
      index: value,
    };
  });

  return (
    <View style={styles.container}>
      <SpatialNavigatorVirtualizedList
        data={indexes}
        renderItem={renderItem}
        itemSize={PROGRAM_HEIGHT + 50}
        numberOfRenderedItems={WINDOW_SIZE}
        numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
