import { Direction } from '@bam.tech/lrud';
import { useIsFocused } from '@react-navigation/native';
import { ReactNode, useCallback } from 'react';
import { SpatialNavigationRoot } from 'react-tv-space-navigation';
import { useMenuContext } from './Menu/MenuContext';

type Props = { children: ReactNode };

export const Page = ({ children }: Props) => {
  const isFocused = useIsFocused();
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();

  const isActive = isFocused && !isMenuOpen;

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      if (movement === 'left') {
        toggleMenu(true);
      }
    },
    [toggleMenu],
  );

  return (
    <SpatialNavigationRoot
      isActive={isActive}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      {children}
    </SpatialNavigationRoot>
  );
};
