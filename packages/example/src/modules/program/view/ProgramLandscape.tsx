import styled from '@emotion/native';
import React from 'react';
import { Animated, Image, View } from 'react-native';
import { ProgramInfo } from '../domain/programInfo';
import { useFocusAnimation } from '../../../design-system/helpers/useFocusAnimation';
import { useSpatialNavigatorFocusableAccessibilityProps } from 'react-tv-space-navigation';

type ProgramProps = {
  isFocused?: boolean;
  programInfo: ProgramInfo;
};

export const ProgramLandscape = React.forwardRef<View, ProgramProps>(
  ({ isFocused = false, programInfo }, ref) => {
    const imageSource = programInfo.image;

    const scaleAnimation = useFocusAnimation(isFocused);

    const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();

    return (
      <ProgramContainer
        style={scaleAnimation} // Apply the animated scale transform
        ref={ref}
        isFocused={isFocused}
        {...accessibilityProps}
      >
        <ProgramImage source={imageSource} />
      </ProgramContainer>
    );
  },
);

ProgramLandscape.displayName = 'ProgramSquare';

const ProgramContainer = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  height: theme.sizes.program.portrait.height,
  width: theme.sizes.program.landscape.width * 2,
  overflow: 'hidden',
  borderRadius: 20,
  borderColor: isFocused ? theme.colors.primary.light : 'transparent',
  borderWidth: 3,
}));

const ProgramImage = styled(Image)({
  height: '100%',
  width: '100%',
});
