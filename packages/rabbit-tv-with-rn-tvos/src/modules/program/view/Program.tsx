import styled from '@emotion/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { ProgramInfo } from '../domain/programInfo';

type ProgramProps = {
  isFocused?: boolean;
  programInfo: ProgramInfo;
};

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
      <ProgramContainer
        style={{ transform: [{ scale: scaleAnimation }] }} // Apply the animated scale transform
        ref={ref}
        isFocused={isFocused}
      >
        <ProgramImage source={imageSource} />
      </ProgramContainer>
    );
  },
);

Program.displayName = 'Program';

const ProgramContainer = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  height: theme.sizes.program.portrait.height,
  width: theme.sizes.program.portrait.width,
  overflow: 'hidden',
  borderRadius: 20,
  borderColor: isFocused ? theme.colors.primary.light : 'transparent',
  borderWidth: 3,
}));

const ProgramImage = styled(Image)({
  height: '100%',
  width: '100%',
});
