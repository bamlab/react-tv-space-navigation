import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';

import { StyleSheet, View } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SimpleNode } from './SimpleNode';
import { VirtualizedColumn, VirtualizedRow } from './VirtualizedSpatialList';
import './configureRemoteControl';
import { RootStackParamList } from '../../App';

export const SimpleRSNApp = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <View style={styles.container}>
            <SimpleNode onSelect={() => navigation.navigate('OtherPrograms')} />
            <View style={styles.spacer} />
            <VirtualizedRow numberOfItems={100} />
            <View style={styles.spacer} />
            <VirtualizedRow numberOfItems={100} />
            <View style={styles.spacer} />
            <VirtualizedRow numberOfItems={100} />
            <View style={styles.spacer} />
            <VirtualizedRow numberOfItems={100} />
          </View>
          <SpatialNavigationView direction="horizontal">
            <View style={styles.containerRow}>
              <View style={styles.spacerRow} />
              <SpatialNavigationView direction="vertical" style={styles.smallContainerPrograms}>
                <SimpleNode />
                <SimpleNode />
              </SpatialNavigationView>
              <View style={styles.spacerRow} />
              <VirtualizedColumn numberOfItems={100} />
              <View style={styles.spacerRow} />
              <VirtualizedColumn numberOfItems={100} />
              <View style={styles.spacerRow} />
              <VirtualizedColumn numberOfItems={100} />
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
      </DefaultFocus>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  container: { padding: 60 },
  spacer: { height: 50 },
  containerRow: { padding: 60, flexDirection: 'row' },
  spacerRow: { width: 50 },
  smallContainerPrograms: {
    padding: 70,
    gap: 50,
  },
  containerPrograms: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gap: { gap: 50 },
});
