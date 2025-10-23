import { Page } from '../components/Page';

import { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import {
  SpatialNavigationFocusableView,
  SpatialNavigationVirtualizedList,
} from 'react-tv-space-navigation';
import { useParentId } from '../../../lib/src/spatial-navigation/context/ParentIdContext';

const AMOUNT_OF_ITEMS = 2000;

const rails = {
  id: `rail-0`,
  items: new Array(AMOUNT_OF_ITEMS).fill(0).map((__, i) => ({ id: `r0-i${i}` })),
};

const { width: SCREEN_W } = Dimensions.get('window');

const scale = SCREEN_W / 1920;
export const responsiveSize = (pixels: number) => pixels * scale;

const ROW_HEIGHT = responsiveSize(355);
const TILE_W = responsiveSize(225);
const GAP = responsiveSize(24);
const ITEM_SIZE = TILE_W + GAP;

export const SimpleVirtualizedListPage = () => {
  const data = useMemo(() => rails, []);

  return (
    <Page>
      {/* Rails area (nested SNVL) */}
      <View style={{ height: '100%', width: '100%' }}>
        <Row rail={data} />
      </View>
    </Page>
  );
};

function Row({ rail }: { rail: { id: string; items: { id: string }[] } }): JSX.Element {
  const id = useParentId();
  return (
    <View style={{ height: ROW_HEIGHT, width: SCREEN_W }}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
        }}
      >
        {id}
      </Text>
      <SpatialNavigationVirtualizedList
        orientation="horizontal"
        debug={false}
        data={rail.items}
        itemSize={ITEM_SIZE}
        scrollBehavior="stick-to-start" // ← becomes inconsistent when nested with many vertical rails
        renderItem={() => Tile()}
      />
    </View>
  );
}

function Tile(): JSX.Element {
  return (
    <SpatialNavigationFocusableView>
      {({ isFocused }) => Content(isFocused)}
    </SpatialNavigationFocusableView>
  );
}
function Content(isFocused: boolean) {
  const id = useParentId();
  return (
    <View
      style={{
        width: TILE_W,
        height: ROW_HEIGHT - GAP,
        backgroundColor: isFocused ? 'red' : 'blue',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 30,
        }}
      >
        {id?.replace(/(\d+)/g, '$1\n')}
      </Text>
    </View>
  );
}
