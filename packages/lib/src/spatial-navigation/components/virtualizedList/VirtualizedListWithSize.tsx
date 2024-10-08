import { StyleSheet, View, Dimensions } from 'react-native';
import { typedMemo } from '../../helpers/TypedMemo';
import { VirtualizedList, VirtualizedListProps } from './VirtualizedList';
import { useState } from 'react';

/**
 * This component has for only purpose to give to the VirtualizedList its actual
 * width and height. It is used to avoid the VirtualizedList to render with a width
 * or height not defined (as it is used later for computing offsets for example).
 * The size is computed only once and then the VirtualizedList is rendered. This
 * doesn't support dynamic size changes.
 */
export const VirtualizedListWithSize = typedMemo(
  <T,>(props: Omit<VirtualizedListProps<T>, 'listSizeInPx'>) => {
    const isVertical = props.orientation === 'vertical';
    const [listSizeInPx, setListSizeInPx] = useState<number>(
      isVertical ? Dimensions.get('window').height : Dimensions.get('window').width,
    );
    const [hasAlreadyRendered, setHasAlreadyRendered] = useState<boolean>(false);

    return (
      <View
        style={style.container}
        onLayout={(event) => {
          if (!hasAlreadyRendered) {
            const sizeKey = isVertical ? 'height' : 'width';
            if (event.nativeEvent.layout[sizeKey] !== 0) {
              setListSizeInPx(event.nativeEvent.layout[sizeKey]);
              setHasAlreadyRendered(true);
            }
          }
        }}
        testID={props.testID ? props.testID + '-size-giver' : undefined}
      >
        <VirtualizedList {...props} listSizeInPx={listSizeInPx} />
      </View>
    );
  },
);
VirtualizedListWithSize.displayName = 'VirtualizedListWithSize';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
