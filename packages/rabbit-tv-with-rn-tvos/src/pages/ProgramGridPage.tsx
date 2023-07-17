import { StyleSheet, View } from 'react-native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-native-tv-spatial-navigation/src';
import { VirtualizedSpatialGrid } from '../components/VirtualizedSpatialGrid';
import '../components/configureRemoteControl';
import { Page } from '../components/atom/Page';

export const ProgramGridPage = () => {
  return (
    <Page>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <View style={styles.container}>
            <VirtualizedSpatialGrid numberOfItems={100} />
          </View>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: { padding: 40, flex: 1 },
});