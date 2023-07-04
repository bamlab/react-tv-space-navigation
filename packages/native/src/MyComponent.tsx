import { View, StyleSheet } from 'react-native';

export const MyComponent = () => {
  return <View style={styles.view} />;
};

const styles = StyleSheet.create({
  view: { width: 100, height: 100, backgroundColor: 'red' },
});
