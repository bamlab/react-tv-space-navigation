import SpatialNavigator from '../SpatialNavigator';
import { createContext, useContext } from 'react';

export const SpatialNavigatorContext = createContext<SpatialNavigator | null>(null);

export const useSpatialNavigator = () => {
  const spatialNavigator = useContext(SpatialNavigatorContext);
  if (!spatialNavigator)
    throw new Error(
      'No registered spatial navigator on this page. Use the <SpatialNavigationRoot /> component.',
    );
  return spatialNavigator;
};
