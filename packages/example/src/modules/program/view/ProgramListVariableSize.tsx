import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { SpatialNavigationNode, SpatialNavigationVirtualizedList } from 'react-tv-space-navigation';
import { RootStackParamList } from '../../../../App';
import { ProgramNode } from './ProgramNode';
import { scaledPixels } from '../../../design-system/helpers/scaledPixels';
import { ProgramNodeLandscape } from './ProgramNodeLandscape';
import { getPrograms } from '../infra/programInfos';
import { ProgramInfo } from '../domain/programInfo';
import { LeftArrow, RightArrow } from '../../../design-system/components/Arrows';
import { StyleSheet } from 'react-native';
import { theme } from '../../../design-system/theme/theme';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 7;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;
const ROW_PADDING = scaledPixels(70);

export const ProgramList = ({
  orientation,
  containerStyle,
}: {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isItemLarge = (item: ProgramInfo) => {
    return parseInt(item.id, 10) % 2 === 0;
  };

  const renderItem = useCallback(
    ({ item, index }: { item: ProgramInfo; index: number }) =>
      isItemLarge(item) ? (
        <ProgramNode
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
          label={index.toString()}
        />
      ) : (
        <ProgramNodeLandscape
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
          label={index.toString()}
        />
      ),
    [navigation],
  );
  const theme = useTheme();

  const programInfos = useMemo(() => getPrograms(10), []);

  return (
    <SpatialNavigationNode>
      {({ isActive }) => (
        <Container style={containerStyle}>
          <SpatialNavigationVirtualizedList
            orientation={orientation}
            data={programInfos}
            renderItem={renderItem}
            itemSize={(item) =>
              isItemLarge(item)
                ? theme.sizes.program.portrait.width + 30
                : theme.sizes.program.landscape.width * 2 + 45
            }
            numberOfRenderedItems={WINDOW_SIZE}
            numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            descendingArrow={isActive ? <LeftArrow /> : null}
            descendingArrowContainerStyle={styles.leftArrowContainer}
            ascendingArrow={isActive ? <RightArrow /> : null}
            ascendingArrowContainerStyle={styles.rightArrowContainer}
          />
        </Container>
      )}
    </SpatialNavigationNode>
  );
};

export const ProgramsRowVariableSize = ({ containerStyle }: { containerStyle?: object }) => {
  const theme = useTheme();
  return (
    <ProgramList
      containerStyle={{
        ...containerStyle,
        height: theme.sizes.program.portrait.height + ROW_PADDING,
      }}
    />
  );
};

const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.background.mainHover,
  padding: theme.spacings.$8,
  borderRadius: scaledPixels(20),
  overflow: 'hidden',
}));

const styles = StyleSheet.create({
  leftArrowContainer: {
    width: 120,
    height: scaledPixels(260) + 2 * theme.spacings.$8,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    left: -theme.spacings.$8,
  },
  rightArrowContainer: {
    width: 120,
    height: scaledPixels(260) + 2 * theme.spacings.$8,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    right: -theme.spacings.$8,
  },
});
