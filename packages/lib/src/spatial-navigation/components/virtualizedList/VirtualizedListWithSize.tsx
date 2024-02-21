import { StyleSheet, View } from 'react-native';
import { typedMemo } from '../../helpers/TypedMemo';
import { ItemWithIndex, VirtualizedList, VirtualizedListProps } from './VirtualizedList';
import { useState } from 'react';

/**
 * This component has for only purpose to give to the VirtualizedList its actual
 * width and height. It is used to avoid the VirtualizedList to render with a width
 * or height not defined (as it is used later for computing offsets for example).
 * The size is computed only once and then the VirtualizedList is rendered. This
 * doesn't support dynamic size changes.
 */
export const VirtualizedListWithSize = typedMemo(
  <T extends ItemWithIndex>(props: Omit<VirtualizedListProps<T>, 'listSizeInPx'>) => {
    const [listSizeInPx, setListSizeInPx] = useState<number | null>(null);
    const isVertical = props.orientation === 'vertical';

    return (
      <View
        style={style.container}
        onLayout={(event) => {
          if (!listSizeInPx) {
            const sizeKey = isVertical ? 'height' : 'width';
            setListSizeInPx(event.nativeEvent.layout[sizeKey]);
          }
        }}
        testID={props.testID ? props.testID + '-size-giver' : undefined}
      >
        {listSizeInPx ? <VirtualizedList {...props} listSizeInPx={listSizeInPx} /> : null}
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
