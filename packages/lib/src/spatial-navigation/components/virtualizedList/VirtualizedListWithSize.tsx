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
  <T extends ItemWithIndex>(props: Omit<VirtualizedListProps<T>, 'width' | 'height'>) => {
    const [viewHeight, setViewHeight] = useState<number | null>(null);
    const [viewWidth, setViewWidth] = useState<number | null>(null);
    const shouldRender = viewWidth && viewHeight;

    return (
      <View
        style={style.container}
        onLayout={(event) => {
          if (!viewHeight) {
            setViewHeight(event.nativeEvent.layout.height);
          }
          if (!viewWidth) {
            setViewWidth(event.nativeEvent.layout.width);
          }
        }}
        testID={props.testID ? props.testID + '-size-giver' : undefined}
      >
        {shouldRender ? <VirtualizedList {...props} width={viewWidth} height={viewHeight} /> : null}
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
