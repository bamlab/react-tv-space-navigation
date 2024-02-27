import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import {
  SpatialNavigationFocusableView,
  useSpatialNavigatorFocusableAccessibilityProps,
} from 'react-tv-space-navigation';
import { Typography } from './Typography';
import styled from '@emotion/native';
import { useFocusAnimation } from '../helpers/useFocusAnimation';
import { scaledPixels } from '../helpers/scaledPixels';

type ButtonProps = {
  label: string;
  onSelect?: () => void;
};

const ButtonContent = forwardRef<View, { label: string; isFocused: boolean }>((props, ref) => {
  const { isFocused, label } = props;
  const anim = useFocusAnimation(isFocused);
  const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
  return (
    <Container style={anim} isFocused={isFocused} ref={ref} {...accessibilityProps}>
      <ColoredTypography isFocused={isFocused}>{label}</ColoredTypography>
    </Container>
  );
});

ButtonContent.displayName = 'ButtonContent';

export const Button = ({ label, onSelect }: ButtonProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => <ButtonContent label={label} isFocused={isFocused} />}
    </SpatialNavigationFocusableView>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  alignSelf: 'baseline',
  backgroundColor: isFocused ? 'white' : 'black',
  padding: theme.spacings.$4,
  borderRadius: scaledPixels(12),
  cursor: 'pointer',
}));

const ColoredTypography = styled(Typography)<{ isFocused: boolean }>(({ isFocused }) => ({
  color: isFocused ? 'black' : 'white',
}));
