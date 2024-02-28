import styled from '@emotion/native';
import { forwardRef } from 'react';
import { Animated, View } from 'react-native';
import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';
import { scaledPixels } from '../../design-system/helpers/scaledPixels';
import { useFocusAnimation } from '../../design-system/helpers/useFocusAnimation';
import { theme } from '../../design-system/theme/theme';
import { Icon } from '../../design-system/helpers/Icons';
import { IconName } from '../../design-system/helpers/IconsCatalog';

type ButtonProps = {
  icon: IconName;
  isMenuOpen: boolean;
  onSelect?: () => void;
};

const ButtonContent = forwardRef<View, { icon: IconName; isFocused: boolean; isMenuOpen: boolean }>(
  (props, ref) => {
    const { isFocused, icon, isMenuOpen } = props;
    const anim = useFocusAnimation(isFocused && isMenuOpen);
    return (
      <Container style={anim} isFocused={isFocused} isMenuOpen={isMenuOpen} ref={ref}>
        <Icon
          icon={icon}
          size={theme.sizes.menu.icon}
          color={
            isFocused && isMenuOpen
              ? theme.colors.background.main
              : theme.colors.background.contrastText
          }
        />
      </Container>
    );
  },
);

ButtonContent.displayName = 'ButtonContent';

export const MenuButton = ({ icon, isMenuOpen, onSelect }: ButtonProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <ButtonContent icon={icon} isFocused={isFocused} isMenuOpen={isMenuOpen} />
      )}
    </SpatialNavigationFocusableView>
  );
};

const Container = styled(Animated.View)<{ isFocused: boolean; isMenuOpen: boolean }>(
  ({ isFocused, isMenuOpen, theme }) => ({
    alignSelf: 'baseline',
    backgroundColor: isFocused && isMenuOpen ? 'white' : 'black',
    padding: theme.spacings.$4,
    borderRadius: scaledPixels(12),
    cursor: 'pointer',
  }),
);
