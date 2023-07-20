import { useIsFocused } from '@react-navigation/native';
import { ReactNode } from 'react';
import { SpatialNavigationRoot } from 'react-native-tv-spatial-navigation/src';

type Props = { children: ReactNode };

export const Page = ({ children }: Props) => {
  const isFocused = useIsFocused();
  return <SpatialNavigationRoot isActive={isFocused}>{children}</SpatialNavigationRoot>;
};
