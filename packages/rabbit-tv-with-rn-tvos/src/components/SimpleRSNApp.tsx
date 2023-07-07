import {
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
} from 'react-native-tv-spatial-navigation/src';

import './configureKeyboard';
import {Row} from './VirtualizedRow';
import {View, StyleSheet} from 'react-native';

export const SimpleRSNApp = () => {
  return (
    <SpatialNavigationRoot>
      <SpatialNavigationScrollView offsetFromStart={140}>
        <View style={styles.container}>
          <View style={styles.spacer} />
          <Row numberOfItems={100} />
          <View style={styles.spacer} />
          <Row numberOfItems={100} />
          <View style={styles.spacer} />
          <Row numberOfItems={100} />
          <View style={styles.spacer} />
          <Row numberOfItems={100} />
        </View>
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  spacer: {height: 50},
  container: {padding: 60},
});
