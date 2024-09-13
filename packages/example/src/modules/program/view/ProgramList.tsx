import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';
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
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../design-system/theme/theme';
import { SupportedKeys } from '../../../components/remote-control/SupportedKeys';
import { useKey } from '../../../hooks/useKey';
import React from 'react';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 7;
const ROW_PADDING = scaledPixels(70);

const GAP_BETWEEN_ELEMENTS = scaledPixels(30);

type ProgramListProps = {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
  data?: ProgramInfo[];
  listSize?: number;
  variant?: 'normal' | 'variable-size';
  parentRef?: MutableRefObject<SpatialNavigationVirtualizedListRef | null>;
  isActive: boolean;
};

const isItemLarge = (item: { id: string }) => {
  return parseInt(item.id, 10) % 2 === 0; // Arbitrary condition to decide size
};

export const ProgramList = React.forwardRef<View, ProgramListProps>(
  ({ orientation, containerStyle, data, parentRef, isActive, variant, listSize = 1000 }, ref) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const theme = useTheme();
    const listRef = useRef<SpatialNavigationVirtualizedListRef | null>(null);

    const renderItem = useCallback(
      ({ item, index }: { item: ProgramInfo; index: number }) => (
        <ProgramNode
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
          label={index.toString()}
          variant={variant === 'variable-size' && isItemLarge(item) ? 'landscape' : 'portrait'}
        />
      ),
      [navigation, variant],
    );
    const isScreenFocused = useIsFocused();

    const programInfos = useMemo(() => data ?? getPrograms(listSize), [data, listSize]);

    const itemSize = useMemo(
      () => {
        if (variant === 'normal') {
          return theme.sizes.program.portrait.width + GAP_BETWEEN_ELEMENTS;
        }

        return (item: ProgramInfo) =>
          isItemLarge(item)
            ? theme.sizes.program.landscape.width + GAP_BETWEEN_ELEMENTS
            : theme.sizes.program.portrait.width + GAP_BETWEEN_ELEMENTS;
      }, // Default item size for "normal"
      [theme.sizes.program.landscape.width, theme.sizes.program.portrait.width, variant],
    );

    const goToFirstItem = useCallback(
      (pressedKey: SupportedKeys) => {
        const isBackKey = pressedKey === SupportedKeys.Back;
        const isRowActive = isActive && isScreenFocused;
        const isFirstElementFocused = listRef.current?.currentlyFocusedItemIndex === 0;

        if (!isBackKey || !isRowActive || isFirstElementFocused) {
          return false;
        }

        listRef.current?.focus(0);
        return true;
      },
      [isActive, isScreenFocused, listRef],
    );

    useKey(SupportedKeys.Back, goToFirstItem);

    return (
      <Container isActive={isActive} style={containerStyle} ref={ref}>
        <SpatialNavigationVirtualizedList
          orientation={orientation}
          data={programInfos}
          renderItem={renderItem}
          itemSize={itemSize}
          onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
          // @ts-expect-error TODO change the type from ReactElement to ReactNode in the core
          descendingArrow={isActive ? <LeftArrow /> : null}
          descendingArrowContainerStyle={styles.leftArrowContainer}
          // @ts-expect-error TODO change the type from ReactElement to ReactNode in the core
          ascendingArrow={isActive ? <RightArrow /> : null}
          ascendingArrowContainerStyle={styles.rightArrowContainer}
          ref={(elementRef) => {
            if (parentRef) parentRef.current = elementRef;
            listRef.current = elementRef;
          }}
        />
      </Container>
    );
  },
);
ProgramList.displayName = 'ProgramList';

export const ProgramsRow = ({
  containerStyle,
  variant = 'normal',
  listSize,
  parentRef,
  data,
}: {
  containerStyle?: object;
  variant?: 'normal' | 'variable-size';
  listSize?: number;
  parentRef?: MutableRefObject<SpatialNavigationVirtualizedListRef | null>;
  data?: ProgramInfo[];
}) => {
  const theme = useTheme();
  return (
    <SpatialNavigationNode>
      {({ isActive }) => (
        <ProgramList
          containerStyle={{
            ...containerStyle,
            height: theme.sizes.program.portrait.height + ROW_PADDING,
          }}
          variant={variant}
          listSize={listSize}
          parentRef={parentRef}
          isActive={isActive}
          data={data}
        />
      )}
    </SpatialNavigationNode>
  );
};

const Container = styled.View<{ isActive: boolean }>(({ isActive, theme }) => ({
  backgroundColor: isActive
    ? theme.colors.background.mainActive
    : theme.colors.background.mainHover,
  padding: theme.spacings.$8,
  borderRadius: scaledPixels(20),
  overflow: 'hidden',
  width: '100%',
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
