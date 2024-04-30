import styled from '@emotion/native';
import React from 'react';
import { Animated, Image, View } from 'react-native';
import { ProgramInfo } from '../domain/programInfo';
import { useFocusAnimation } from '../../../design-system/helpers/useFocusAnimation';
import { Typography } from '../../../design-system/components/Typography';

type ProgramProps = {
  isFocused?: boolean;
  programInfo: ProgramInfo;
  label?: string;
};

const Label = ({ label }: { label: string }) => {
  return <Typography>{label}</Typography>;
};

export const ProgramLandscape = React.forwardRef<View, ProgramProps>(
  ({ isFocused = false, programInfo, label }, ref) => {
    const imageSource = programInfo.image;

    const scaleAnimation = useFocusAnimation(isFocused);

    return (
      <ProgramContainer
        style={scaleAnimation} // Apply the animated scale transform
        ref={ref}
        isFocused={isFocused}
      >
        <ProgramImage source={imageSource} accessible />
        {label ? (
          <Overlay>
            <Label label={label} />
          </Overlay>
        ) : null}
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

const Overlay = styled.View({
  position: 'absolute',
  bottom: 12,
  left: 12,
});
