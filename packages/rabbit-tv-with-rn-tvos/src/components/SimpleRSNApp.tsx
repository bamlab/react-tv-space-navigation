import {
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
} from 'react-native-tv-spatial-navigation/src';

import './configureKeyboard';
import {Row} from './VirtualizedRow';

export const SimpleRSNApp = () => {
  return (
    <SpatialNavigationRoot>
      <SpatialNavigationScrollView offsetFromStart={50}>
        <Row numberOfItems={100} />
        <Row numberOfItems={100} />
        <Row numberOfItems={100} />
        <Row numberOfItems={100} />
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
};
