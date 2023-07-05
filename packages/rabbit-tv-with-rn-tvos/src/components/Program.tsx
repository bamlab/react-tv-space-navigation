import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useRabbitImageSource} from './useRabbitImageSource';

export const Program = () => {
  const imageSource = useRabbitImageSource();

  return (
    <TouchableOpacity>
      <Image style={styles.programImage} source={imageSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  programImage: {
    width: 200,
    height: 250,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
});
