import { StyleSheet, View } from 'react-native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-tv-space-navigation/src';
import { Page } from '../components/Page';
import { VirtualizedSpatialGrid } from '../components/VirtualizedSpatialGrid';
import '../components/configureRemoteControl';

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
