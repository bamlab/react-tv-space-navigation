import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { SpatialNavigationVirtualizedList } from 'react-tv-space-navigation/src';
import { RootStackParamList } from '../../../../App';
import { ProgramInfo } from '../domain/programInfo';
import { programInfos } from '../infra/programInfos';
import { ProgramNode } from './ProgramNode';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 6;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;
const ROW_PADDING = 70;

export const ProgramList = ({
  orientation,
  containerStyle,
}: {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
}) => {
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

  return (
    <Container style={containerStyle}>
      <SpatialNavigationVirtualizedList
        orientation={orientation}
        data={programInfos}
        renderItem={renderItem}
        itemSize={theme.sizes.program.portrait.height + 50}
        numberOfRenderedItems={WINDOW_SIZE}
        numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
      />
    </Container>
  );
};

export const ProgramsRow = ({ containerStyle }: { containerStyle?: object }) => {
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

export const ProgramsColumn = ({ containerStyle }: { containerStyle?: object }) => {
  const theme = useTheme();
  return (
    <ProgramList
      orientation="vertical"
      containerStyle={{
        ...containerStyle,
        width: theme.sizes.program.portrait.width + ROW_PADDING,
        height: 3 * (theme.sizes.program.portrait.height + ROW_PADDING),
      }}
    />
  );
};

const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.background.mainHover,
  padding: theme.spacings.$8,
  borderRadius: 20,
  overflow: 'hidden',
}));
