import { Grid3X3, Home, LayoutDashboard, LayoutGrid, Timer } from 'lucide-react-native';

export const iconsCatalog = {
  Home: Home,
  Grid3X3: Grid3X3,
  LayoutGrid: LayoutGrid,
  LayoutDashboard: LayoutDashboard,
  Timer: Timer,
};

export type IconName = keyof typeof iconsCatalog;
