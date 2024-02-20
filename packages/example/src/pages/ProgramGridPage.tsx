import { StyleSheet, View } from 'react-native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import { VirtualizedSpatialGrid } from '../components/VirtualizedSpatialGrid';
import '../components/configureRemoteControl';
import { scaledPixels } from '../design-system/helpers/scaledPixels';

export const ProgramGridPage = () => {
  return (
    <Page>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <View style={styles.container}>
            <VirtualizedSpatialGrid />
          </View>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: { padding: scaledPixels(40), flex: 1 },
});
