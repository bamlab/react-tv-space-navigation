import styled from '@emotion/native';
import React from 'react';
import { Animated, Image, View } from 'react-native';
import { ProgramInfo } from '../domain/programInfo';
import { useFocusAnimation } from '../../../design-system/helpers/useFocusAnimation';

type LongProgramProps = {
  isFocused?: boolean;
  programInfo: ProgramInfo;
};

export const LongProgram = React.forwardRef<View, LongProgramProps>(
  ({ isFocused = false, programInfo }, ref) => {
    const imageSource = programInfo.image;

    const scaleAnimation = useFocusAnimation(isFocused);

    return (
      <LongProgramContainer
        style={scaleAnimation} // Apply the animated scale transform
        ref={ref}
        isFocused={isFocused}
      >
        <LongProgramImage source={imageSource} accessible />
      </LongProgramContainer>
    );
  },
);

LongProgram.displayName = 'LongProgram';

const LongProgramContainer = styled(Animated.View)<{ isFocused: boolean }>(
  ({ isFocused, theme }) => ({
    height: theme.sizes.program.long.height,
    width: theme.sizes.program.long.width,
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: isFocused ? theme.colors.primary.light : 'transparent',
    borderWidth: 3,
  }),
);

const LongProgramImage = styled(Image)({
  height: '100%',
  width: '100%',
});
