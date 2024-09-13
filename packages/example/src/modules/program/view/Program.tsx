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
  variant?: 'portrait' | 'landscape';
};

const Label = React.memo(({ label }: { label: string }) => {
  return <Typography>{label}</Typography>;
});
Label.displayName = 'Label';

export const Program = React.memo(
  React.forwardRef<View, ProgramProps>(
    ({ isFocused = false, programInfo, label, variant = 'portrait' }, ref) => {
      const imageSource = programInfo.image;
      const scaleAnimation = useFocusAnimation(isFocused);

      return (
        <ProgramContainer
          style={scaleAnimation} // Apply the animated scale transform
          ref={ref}
          isFocused={isFocused}
          variant={variant}
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
  ),
);

Program.displayName = 'Program';

const ProgramContainer = styled(Animated.View)<{
  isFocused: boolean;
  variant: 'portrait' | 'landscape';
}>(({ isFocused, variant, theme }) => ({
  height: theme.sizes.program.portrait.height, // Height is the same for both variants
  width:
    variant === 'landscape'
      ? theme.sizes.program.landscape.width
      : theme.sizes.program.portrait.width,
  overflow: 'hidden',
  borderRadius: 20,
  borderColor: isFocused ? theme.colors.primary.light : 'transparent',
  borderWidth: 3,
  cursor: 'pointer',
}));

const ProgramImage = React.memo(
  styled(Image)({
    height: '100%',
    width: '100%',
  }),
);

const Overlay = React.memo(
  styled.View({
    position: 'absolute',
    bottom: 12,
    left: 12,
  }),
);
