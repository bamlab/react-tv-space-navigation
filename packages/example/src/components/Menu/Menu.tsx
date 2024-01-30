import { Direction } from '@bam.tech/lrud';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import { useMenuContext } from './MenuContext';

import { Fragment, useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import styled from '@emotion/native';
import { Typography } from '../../design-system/components/Typography';
import { Spacer } from '../../design-system/components/Spacer';
import { Box } from '../../design-system/components/Box';
import { useTheme } from '@emotion/react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MenuButton } from './MenuButton';

const windowDimensions = Dimensions.get('window');

const MenuItem = ({
  label,
  isMenuOpen,
  isActive,
  onSelect,
}: {
  label: string;
  isMenuOpen: boolean;
  isActive: boolean;
  onSelect: () => void;
}) => {
  return (
    <Box direction="horizontal" alignItems="center">
      <ActiveIndicator isActive={isActive} />
      <MenuButton label={label[0]} onSelect={() => onSelect()} isMenuOpen={isMenuOpen} />
      {isMenuOpen && (
        <>
          <Spacer direction="horizontal" gap="$2" />
          <Typography>{label}</Typography>
        </>
      )}
    </Box>
  );
};

export const Menu = ({ state, navigation }: BottomTabBarProps) => {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const theme = useTheme();
  const animatedWidth = useRef(
    new Animated.Value(isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed),
  ).current;

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'right') {
        toggleMenu(false);
      }
    },
    [toggleMenu],
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isMenuOpen ? theme.sizes.menu.open : theme.sizes.menu.closed,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, isMenuOpen, theme.sizes.menu.closed, theme.sizes.menu.open]);

  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <AbsoluteMenuContainer>
        <SpatialNavigationView direction="vertical">
          <MenuSpacer />
          <MenuOverlay style={{ width: animatedWidth }} />
          <MenuContainer>
            <DefaultFocus>
              <View>
                {state.routes.map((route, index) => {
                  return (
                    <Fragment key={route.key}>
                      <MenuItem
                        label={route.name}
                        isMenuOpen={isMenuOpen}
                        isActive={state.index === index}
                        onSelect={() => navigation.navigate(route.name, route.params)}
                      />
                      <Spacer direction="vertical" gap={'$4'} />
                    </Fragment>
                  );
                })}
              </View>
            </DefaultFocus>
          </MenuContainer>
        </SpatialNavigationView>
      </AbsoluteMenuContainer>
    </SpatialNavigationRoot>
  );
};

const MenuContainer = styled.View(({ theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: 'transparent',
  width: theme.sizes.menu.open,
  height: windowDimensions.height,
  paddingLeft: theme.spacings.$4,
  justifyContent: 'center',
}));

const MenuOverlay = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  backgroundColor: theme.colors.background.mainHover,
  height: windowDimensions.height,
}));

const ActiveIndicator = styled.View<{ isActive: boolean }>(({ isActive, theme }) => ({
  marginRight: 6,
  width: 4,
  height: '80%',
  backgroundColor: isActive ? theme.colors.primary.main : 'transparent',
  borderRadius: 4,
}));

const MenuSpacer = styled.View(({ theme }) => ({
  width: theme.sizes.menu.closed,
}));

const AbsoluteMenuContainer = styled.View({
  position: 'absolute',
});
