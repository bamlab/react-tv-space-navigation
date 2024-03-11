import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MutableRefObject, forwardRef, useCallback, useMemo } from 'react';
import {
  SpatialNavigationNode,
  SpatialNavigationNodeRef,
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

type ProgramListProps = {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
  listRef: MutableRefObject<SpatialNavigationVirtualizedListRef>;
};

export const ProgramList = forwardRef<SpatialNavigationNodeRef, ProgramListProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ orientation, containerStyle, listRef }, ref) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderItem = useCallback(
      ({ item }: { item: ProgramInfo }) => (
        <ProgramNode
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
        />
      ),
      [navigation],
    );
    const theme = useTheme();

    const programInfos = useMemo(() => getPrograms(1000), []);

    return (
      <SpatialNavigationNode>
        {({ isActive }) => (
          <Container isActive={isActive} style={containerStyle}>
            <SpatialNavigationVirtualizedList
              orientation={orientation}
              data={programInfos}
              renderItem={renderItem}
              itemSize={theme.sizes.program.portrait.width + 30}
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
  },
);

ProgramList.displayName = 'ProgramList';

export const ProgramsRow = ({
  containerStyle,
  listRef,
}: {
  containerStyle?: object;
  listRef: MutableRefObject<SpatialNavigationVirtualizedListRef>;
}) => {
  const theme = useTheme();
  return (
    <ProgramList
      containerStyle={{
        ...containerStyle,
        height: theme.sizes.program.portrait.height + ROW_PADDING,
      }}
      listRef={listRef}
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
