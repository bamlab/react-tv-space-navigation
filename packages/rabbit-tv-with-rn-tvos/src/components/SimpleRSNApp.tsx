import {
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';
import {Program} from './Program';
import {StyleSheet} from 'react-native';
import './configureKeyboard';

const SimpleNode = () => {
  return (
    <SpatialNavigationNode isFocusable>
      {({isFocused}) => <Program touchable={false} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};

export const SimpleRSNApp = () => {
  return (
    <SpatialNavigationRoot>
      <SpatialNavigationScrollView offsetFromStart={50}>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
        <SpatialNavigationScrollView horizontal offsetFromStart={50}>
          <SpatialNavigationView
            style={styles.container}
            direction="horizontal">
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
            <SimpleNode />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    gap: 20,
    backgroundColor: '#444',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
