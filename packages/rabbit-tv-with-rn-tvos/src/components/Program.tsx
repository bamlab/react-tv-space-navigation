import {Image, StyleSheet, View} from 'react-native';

import {useRabbitImageSource} from './useRabbitImageSource';
import React from 'react';

type ProgramProps = {
  touchable?: boolean;
  isFocused?: boolean;
};

export const Program = React.forwardRef<View, ProgramProps>(
  ({isFocused = false}, ref) => {
    const imageSource = useRabbitImageSource();

    return (
      <View style={styles.container} ref={ref}>
        <Image
          style={[
            styles.programImage,
            isFocused && {transform: [{scale: 1.1}]},
          ]}
          source={imageSource}
        />
      </View>
    );
  },
);

Program.displayName = 'Program';

const styles = StyleSheet.create({
  programImage: {
    width: 200,
    height: 250,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
  container: {
    flex: 1,
  },
});
