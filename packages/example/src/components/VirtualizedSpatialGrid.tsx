import { useTheme } from '@emotion/react';
import { useCallback, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SpatialNavigationVirtualizedGrid } from 'react-tv-space-navigation';
import { getPrograms } from '../modules/program/infra/programInfos';
import { ProgramNode } from '../modules/program/view/ProgramNode';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { theme } from '../design-system/theme/theme';
import { Header } from '../modules/header/view/Header';
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';

const NUMBER_OF_ROWS_VISIBLE_ON_SCREEN = 2;
const NUMBER_OF_RENDERED_ROWS = NUMBER_OF_ROWS_VISIBLE_ON_SCREEN + 5;
const NUMBER_OF_COLUMNS = 7;
const INFINITE_SCROLL_ROW_THRESHOLD = 2;

export const VirtualizedSpatialGrid = ({ containerStyle }: { containerStyle?: ViewStyle }) => {
  const renderItem = useCallback(
    ({ item, index }) => <ProgramNode programInfo={item} label={index?.toString?.()} />,
    [],
  );

  const hardcodedRabbitsArray = useMemo(
    () => getPrograms(500).map((element, index) => ({ ...element, index })),
    [],
  );
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedGrid
        data={hardcodedRabbitsArray}
        header={
          <Header
            title="Example of a virtualized grid with spatial navigation"
            description="The grid shown on this page is virtualized, which means that when scrolling, the elements not shown in the screen are not rendered, improving performance. The items are also recycled when scrolling, which means that the same components are reused when scrolling, reducing the re-rendering time."
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
        ascendingArrow={<BottomArrow />}
        ascendingArrowContainerStyle={styles.bottomArrowContainer}
        descendingArrow={<TopArrow />}
        descendingArrowContainerStyle={styles.topArrowContainer}
        scrollInterval={150}
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
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
});
