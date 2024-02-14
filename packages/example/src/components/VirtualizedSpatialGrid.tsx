import { useTheme } from '@emotion/react';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SpatialNavigationVirtualizedGrid } from 'react-tv-space-navigation';
import { programInfos } from '../modules/program/infra/programInfos';
import { ProgramNode } from '../modules/program/view/ProgramNode';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { theme } from '../design-system/theme/theme';
import { Header } from '../modules/header/view/Header';

const NUMBER_OF_ROWS_VISIBLE_ON_SCREEN = 2;
const NUMBER_OF_RENDERED_ROWS = NUMBER_OF_ROWS_VISIBLE_ON_SCREEN + 3;
const NUMBER_OF_COLUMNS = 7;
const INFINITE_SCROLL_ROW_THRESHOLD = 2;

export const VirtualizedSpatialGrid = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => {
  // TODO: correct SpatialNavigationVirtualizedGrid props types
  const renderItem = useCallback(() => <ProgramNode programInfo={programInfos[0]} />, []);

  const hardcodedRabbitsArray = Array(numberOfItems).fill({});
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedGrid
        data={hardcodedRabbitsArray}
        header={
          <Header
            title="Rabbit Movies"
            description="Delve into the delightful world of Rabbit Movies, where every film celebrates the charm and whimsy of our favorite fluffy friends. This category is a haven for rabbit lovers, featuring animated escapades and heartwarming family stories starring these adorable creatures."
            verticalSize={scaledPixels(500)}
          />
        }
        headerSize={scaledPixels(500)}
        renderItem={renderItem}
        itemHeight={theme.sizes.program.portrait.height * 1.1}
        numberOfColumns={NUMBER_OF_COLUMNS}
        numberOfRenderedRows={NUMBER_OF_RENDERED_ROWS}
        numberOfRowsVisibleOnScreen={NUMBER_OF_ROWS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdRowsNumber={INFINITE_SCROLL_ROW_THRESHOLD}
        rowContainerStyle={styles.rowStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaledPixels(1000),
    backgroundColor: theme.colors.background.mainHover,
    padding: scaledPixels(30),
    paddingLeft: scaledPixels(75),
    borderRadius: scaledPixels(20),
    overflow: 'hidden',
  },
  rowStyle: { gap: scaledPixels(30) },
});
