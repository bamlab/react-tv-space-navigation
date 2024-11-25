/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import {
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import { memo, useCallback } from 'react';
import { useParentId } from '../../../lib/src/spatial-navigation/context/ParentIdContext';

const Item = memo(({ text }: { text: string }) => {
  console.log('RENDER ITEM', { text, parentId: useParentId() });

  const parentId = useParentId();

  return (
    <SpatialNavigationNode isFocusable customId={text}>
      {({ isFocused }) => (
        <View
          style={{
            margin: 10,
            height: 150,
            width: 80,
            backgroundColor: isFocused ? 'blue' : 'pink',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30 }}>{text}</Text>
        </View>
      )}
    </SpatialNavigationNode>
  );
});
Item.displayName = 'ItemMemoized';

const Row = ({ index }) => {
  const renderItem = useCallback(
    ({ item }: any) => {
      return <Item text={`${index}_${item.index}`} />;
    },
    [index],
  );

  return (
    <View style={{ height: 170 }}>
      <SpatialNavigationVirtualizedList
        data={Array.from({ length: 10 }).map((_, i) => ({
          index: i,
          name: `Item ${i}`,
        }))}
        renderItem={renderItem}
        itemSize={100}
        orientation="horizontal"
      />
    </View>
  );
};

const VirtualizedVariant = () => {
  const renderItem = useCallback(({ item }: any) => {
    return (
      <SpatialNavigationNode isFocusable customId={item}>
        {({ isActive }) => (
          <View style={{ width: 800, backgroundColor: isActive ? 'red' : 'yellow' }}>
            <Row index={item} />
          </View>
        )}
      </SpatialNavigationNode>
    );
  }, []);

  return (
    <>
      <SpatialNavigationRoot>
        <SpatialNavigationVirtualizedList
          data={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']}
          renderItem={renderItem}
          itemSize={170}
          orientation="vertical"
          additionalItemsRendered={0}
        />
        {/* {renderItem({ item: 'A' })}
        {renderItem({ item: 'B' })} */}
      </SpatialNavigationRoot>
    </>
  );
};

export const Test = true ? VirtualizedVariant : NonVirtualizedVariant;
