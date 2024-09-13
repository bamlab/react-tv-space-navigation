import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MutableRefObject, useCallback, useMemo } from 'react';
import {
  SpatialNavigationNode,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import { RootStackParamList } from '../../../../App';
import { ProgramInfo } from '../domain/programInfo';
import { getPrograms } from '../infra/programInfos';
import { ProgramNode } from './ProgramNode';
import { scaledPixels } from '../../../design-system/helpers/scaledPixels';
import { LeftArrow, RightArrow } from '../../../design-system/components/Arrows';
import { StyleSheet } from 'react-native';
import { theme } from '../../../design-system/theme/theme';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 7;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;
const ROW_PADDING = scaledPixels(70);

const GAP_BETWEEN_ELEMENTS = scaledPixels(30);

type ProgramListProps = {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
  data?: ProgramInfo[];
  variant?: 'normal' | 'variable-size';
};

export const ProgramList = ({
  orientation = 'horizontal',
  containerStyle,
  listRef,
  data,
  variant = 'normal',
}: ProgramListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const isItemLarge = useCallback((item: ProgramInfo) => {
    return parseInt(item.id, 10) % 2 === 0; // Arbitrary condition to decide size
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: ProgramInfo; index: number }) => (
      <ProgramNode
        programInfo={item}
        onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
        label={index.toString()}
        variant={variant === 'variable-size' && isItemLarge(item) ? 'landscape' : 'portrait'}
      />
    ),
    [navigation, isItemLarge, variant],
  );

  const programInfos = useMemo(
    () => data ?? getPrograms(variant === 'variable-size' ? 10 : 1000),
    [data, variant],
  );

  return (
    <SpatialNavigationNode>
      {({ isActive }) => (
        <Container isActive={isActive} style={containerStyle}>
          <SpatialNavigationVirtualizedList
            orientation={orientation}
            data={programInfos}
            renderItem={renderItem}
            itemSize={
              variant === 'variable-size'
                ? (item: ProgramInfo) =>
                    isItemLarge(item)
                      ? theme.sizes.program.landscape.width + GAP_BETWEEN_ELEMENTS
                      : theme.sizes.program.portrait.width + GAP_BETWEEN_ELEMENTS
                : theme.sizes.program.portrait.width + GAP_BETWEEN_ELEMENTS // Default item size for "normal"
            }
            numberOfRenderedItems={WINDOW_SIZE}
            numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
            descendingArrow={isActive ? <LeftArrow /> : null}
            descendingArrowContainerStyle={styles.leftArrowContainer}
            ascendingArrow={isActive ? <RightArrow /> : null}
            ascendingArrowContainerStyle={styles.rightArrowContainer}
            ref={listRef}
          />
        </Container>
      )}
    </SpatialNavigationNode>
  );
};

export const ProgramsRow = ({
  containerStyle,
  listRef,
  variant = 'normal',
}: {
  containerStyle?: object;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
  variant?: 'normal' | 'variable-size';
}) => {
  const theme = useTheme();
  return (
    <ProgramList
      containerStyle={{
        ...containerStyle,
        height: theme.sizes.program.portrait.height + ROW_PADDING,
      }}
      listRef={listRef}
      variant={variant}
    />
  );
};

const Container = styled.View<{ isActive: boolean }>(({ isActive, theme }) => ({
  backgroundColor: isActive
    ? theme.colors.background.mainActive
    : theme.colors.background.mainHover,
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
