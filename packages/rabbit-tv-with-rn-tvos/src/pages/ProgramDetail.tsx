import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { DefaultFocus, SpatialNavigationRoot } from 'react-native-tv-spatial-navigation/src';
import { VirtualizedRow } from '../components/VirtualizedSpatialList';

export const ProgramDetail = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <DefaultFocus>
        <View style={styles.container}>
          <View style={styles.spacer} />
          <VirtualizedRow numberOfItems={10} />
          <View style={styles.spacer} />
        </View>
      </DefaultFocus>
    </SpatialNavigationRoot>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: 'red', padding: 60 },
  spacer: { height: 50 },
});
