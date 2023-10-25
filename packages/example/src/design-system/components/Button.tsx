import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import { SpatialNavigationNode } from 'react-tv-space-navigation/src';
import { Typography } from './Typography';
import styled from '@emotion/native';
import { useFocusAnimation } from '../helpers/useFocusAnimation';

type ButtonProps = {
  label: string;
  onSelect?: () => void;
};

const ButtonContent = forwardRef<View, { label: string; isFocused: boolean }>((props, ref) => {
  const { isFocused, label } = props;
  const anim = useFocusAnimation(isFocused);
  return (
    <Container style={anim} isFocused={isFocused} ref={ref}>
      <ColoredTypography isFocused={isFocused}>{label}</ColoredTypography>
    </Container>
  );
});

ButtonContent.displayName = 'ButtonContent';

export const Button = ({ label }: ButtonProps) => {
  return (
    <SpatialNavigationNode isFocusable>
      {({ isFocused }) => <ButtonContent label={label} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused }) => ({
  alignSelf: 'baseline',
  backgroundColor: isFocused ? 'white' : 'black',
  padding: 16,
  borderRadius: 12,
}));

const ColoredTypography = styled(Typography)<{ isFocused: boolean }>(({ isFocused }) => ({
  color: isFocused ? 'black' : 'white',
}));
