import { Animated, Image, StyleSheet, View } from 'react-native';

import React, { useEffect, useRef } from 'react';
import { ProgramInfo } from '../domain/program';

type ProgramProps = {
  touchable?: boolean;
  isFocused?: boolean;
  programInfo: ProgramInfo;
};

export const PROGRAM_PORTRAIT_HEIGHT = 250;
export const PROGRAM_PORTRAIT_WIDTH = 200;
export const PROGRAM_LANDSCAPE_HEIGHT = 200;
export const PROGRAM_LANDSCAPE_WIDTH = 250;

export const Program = React.forwardRef<View, ProgramProps>(
  ({ isFocused = false, programInfo }, ref) => {
    const imageSource = programInfo.image;

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
          { transform: [{ scale: scaleAnimation }] }, // Apply the animated scale transform
        ]}
        ref={ref}
      >
        <Image style={styles.programImage} source={imageSource} />
      </Animated.View>
    );
  },
);

Program.displayName = 'Program';

const styles = StyleSheet.create({
  programImage: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: PROGRAM_PORTRAIT_HEIGHT,
    width: PROGRAM_PORTRAIT_WIDTH,
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
  containerFocused: {
    borderColor: 'white',
  },
});
