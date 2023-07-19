import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SpatialNavigationVirtualizedList } from 'react-native-tv-spatial-navigation/src';
import { ProgramInfo } from '../atom/Program/domain/program';
import { programInfos } from '../atom/Program/infra/programInfos';
import { PROGRAM_PORTRAIT_HEIGHT } from '../atom/Program/view/Program';
import { ProgramNode } from './ProgramNode';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 4;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;

export const ProgramList = ({
  orientation,
  containerStyle,
}: {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
}) => {
  const renderItem = useCallback(
    ({ item }: { item: ProgramInfo }) => <ProgramNode programInfo={item} />,
    [],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedList
        orientation={orientation}
        data={programInfos}
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

export const ProgramsRow = ({ containerStyle }: { containerStyle?: object }) => (
  <ProgramList containerStyle={[containerStyle, styles.row]} />
);

export const ProgramsColumn = ({ containerStyle }: { containerStyle?: object }) => (
  <ProgramList orientation="vertical" containerStyle={[containerStyle, styles.column]} />
);
