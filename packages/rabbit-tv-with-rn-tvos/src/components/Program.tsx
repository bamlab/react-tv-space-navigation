import {Animated, Image, StyleSheet, View} from 'react-native';

import {useRabbitImageSource} from './useRabbitImageSource';
import React, {useEffect, useRef} from 'react';

type ProgramProps = {
  touchable?: boolean;
  isFocused?: boolean;
};

export const PROGRAM_HEIGHT = 250;
export const PROGRAM_WIDTH = 275;

export const Program = React.forwardRef<View, ProgramProps>(
  ({isFocused = false}, ref) => {
    const imageSource = useRabbitImageSource();

    const scaleAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(scaleAnimation, {
        toValue: isFocused ? 1.1 : 1,
        useNativeDriver: true,
        damping: 10,
        stiffness: 100,
      }).start();
    }, [isFocused, scaleAnimation]);

    return (
      <Animated.View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          {transform: [{scale: scaleAnimation}]}, // Apply the animated scale transform
        ]}
        ref={ref}>
        <Image style={styles.programImage} source={imageSource} />
      </Animated.View>
    );
  },
);

Program.displayName = 'Program';

const styles = StyleSheet.create({
  programImage: {
    width: 200,
    height: 250,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
  containerFocused: {
    borderColor: 'white',
  },
});
