import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useRabbitImageSource} from './useRabbitImageSource';

export const Highlight = () => {
  const imageSource = useRabbitImageSource();

  return (
    <TouchableOpacity>
      <Image style={styles.highlightImage} source={imageSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlightImage: {
    width: 500,
    height: 250,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
});
