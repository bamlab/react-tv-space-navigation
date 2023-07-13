import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';
import { RootStackParamList } from '../../App';
import { SimpleNode } from '../components/SimpleNode';
import { VirtualizedColumn, VirtualizedRow } from '../components/VirtualizedSpatialList';
import '../components/configureRemoteControl';
import { Spacer } from '../design-system/components/Spacer';

export const SimpleRSNApp = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <View style={styles.container}>
            <SimpleNode onSelect={() => navigation.navigate('OtherPrograms')} />
            <Spacer gap="$12" />
            <VirtualizedRow numberOfItems={100} />
            <Spacer gap="$12" />
            <VirtualizedRow numberOfItems={100} />
            <Spacer gap="$12" />
            <VirtualizedRow numberOfItems={100} />
            <Spacer gap="$12" />
            <VirtualizedRow numberOfItems={100} />
          </View>
          <SpatialNavigationView direction="horizontal">
            <View style={styles.containerRow}>
              <Spacer direction="horizontal" gap="$12" />
              <SpatialNavigationView direction="vertical" style={styles.smallContainerPrograms}>
                <SimpleNode />
                <SimpleNode />
              </SpatialNavigationView>
              <Spacer direction="horizontal" gap="$12" />
              <VirtualizedColumn numberOfItems={100} />
              <Spacer direction="horizontal" gap="$12" />
              <VirtualizedColumn numberOfItems={100} />
              <Spacer direction="horizontal" gap="$12" />
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
          <Spacer gap="$12" />
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  container: { padding: 60 },
  containerRow: { padding: 60, flexDirection: 'row' },
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
