import SpatialNavigator from '../SpatialNavigator';
import { useCallback, useEffect, useMemo } from 'react';

export const useCreateSpatialNavigator = () => {
  const spatialNavigator = useMemo(() => new SpatialNavigator(), []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => spatialNavigator.handleKeyDown(event.code),
    [spatialNavigator],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [spatialNavigator, onKeyDown]);

  return spatialNavigator;
};
