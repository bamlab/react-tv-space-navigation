import { Grid3X3, Home, LayoutDashboard, LayoutGrid } from 'lucide-react-native';

export const iconsCatalog = {
  Home: Home,
  Grid3X3: Grid3X3,
  LayoutGrid: LayoutGrid,
  LayoutDashboard: LayoutDashboard,
};

export type IconName = keyof typeof iconsCatalog;
