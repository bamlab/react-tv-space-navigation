import { useEffect } from 'react';
import SpatialNavigator from '../SpatialNavigator';

export const useLockRootSpatialNavigator = ({
  spatialNavigator,
  isLocked,
}: {
  spatialNavigator: SpatialNavigator;
  isLocked: boolean;
}) => {
  useEffect(() => {
    if (isLocked) spatialNavigator.lock();
    else spatialNavigator.unlock();
  }, [spatialNavigator, isLocked]);
};
