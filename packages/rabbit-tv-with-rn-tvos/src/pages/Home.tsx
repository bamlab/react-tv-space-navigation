import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import {
  DefaultFocus,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';
import { RootStackParamList } from '../../App';
import { Page } from '../components/atom/Page';
import '../components/configureRemoteControl';
import { ProgramNode } from '../components/molecules/ProgramNode';
import { VirtualizedColumn, VirtualizedRow } from '../components/molecules/VirtualizedSpatialList';
import { Spacer } from '../design-system/components/Spacer';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Page>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <View style={styles.container}>
            <ProgramNode onSelect={() => navigation.navigate('ProgramDetail')} />
            <Spacer gap="$12" />
            <ProgramNode onSelect={() => navigation.navigate('ProgramGridPage')} />
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
                <ProgramNode />
                <ProgramNode />
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
              <ProgramNode />
              <ProgramNode />
              <ProgramNode />
              <ProgramNode />
            </SpatialNavigationView>
          </View>
          <Spacer gap="$12" />
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
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
