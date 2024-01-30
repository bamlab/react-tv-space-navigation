import styled from '@emotion/native';
import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import {
  SpatialNavigationNode,
  useSpatialNavigatorFocusableAccessibilityProps,
} from 'react-tv-space-navigation';
import { Typography } from '../../design-system/components/Typography';
import { scaledPixels } from '../../design-system/helpers/scaledPixels';
import { useFocusAnimation } from '../../design-system/helpers/useFocusAnimation';

type ButtonProps = {
  label: string;
  isMenuOpen: boolean;
  onSelect?: () => void;
};

const ButtonContent = forwardRef<View, { label: string; isFocused: boolean; isMenuOpen: boolean }>(
  (props, ref) => {
    const { isFocused, label, isMenuOpen } = props;
    const anim = useFocusAnimation(isFocused && isMenuOpen);
    const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
    return (
      <Container
        style={anim}
        isFocused={isFocused}
        isMenuOpen={isMenuOpen}
        ref={ref}
        {...accessibilityProps}
      >
        <ColoredTypography isFocused={isFocused} isMenuOpen={isMenuOpen}>
          {label}
        </ColoredTypography>
      </Container>
    );
  },
);

ButtonContent.displayName = 'ButtonContent';

export const MenuButton = ({ label, isMenuOpen, onSelect }: ButtonProps) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => (
        <ButtonContent label={label} isFocused={isFocused} isMenuOpen={isMenuOpen} />
      )}
    </SpatialNavigationNode>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean; isMenuOpen: boolean }>(
  ({ isFocused, isMenuOpen, theme }) => ({
    alignSelf: 'baseline',
    backgroundColor: isFocused && isMenuOpen ? 'white' : 'black',
    padding: theme.spacings.$4,
    borderRadius: scaledPixels(12),
  }),
);

const ColoredTypography = styled(Typography)<{ isFocused: boolean; isMenuOpen: boolean }>(
  ({ isFocused, isMenuOpen }) => ({
    color: isFocused && isMenuOpen ? 'black' : 'white',
  }),
);
