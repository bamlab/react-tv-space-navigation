import {
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';

import './configureKeyboard';
import {Row} from './VirtualizedRow';
import {View, StyleSheet} from 'react-native';
import {Column} from './VirtualizedColumn';
import {SimpleNode} from './SimpleNode';

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
        <SpatialNavigationView direction="horizontal">
          <View style={styles.containerRow}>
            <View style={styles.spacerRow} />
            <SpatialNavigationView
              direction="vertical"
              style={styles.smallContainerPrograms}>
              <SimpleNode />
              <SimpleNode />
            </SpatialNavigationView>
            <View style={styles.spacerRow} />
            <Column numberOfItems={100} />
            <View style={styles.spacerRow} />
            <Column numberOfItems={100} />
            <View style={styles.spacerRow} />
            <Column numberOfItems={100} />
          </View>
        </SpatialNavigationView>
        <View style={styles.containerPrograms}>
          <SpatialNavigationView style={styles.gap} direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </View>
        <View style={styles.spacer} />
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  container: {padding: 60},
  spacer: {height: 50},
  containerRow: {padding: 60, flexDirection: 'row'},
  spacerRow: {width: 50},
  smallContainerPrograms: {
    padding: 70,
    gap: 50,
  },
  containerPrograms: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gap: {gap: 100},
});
