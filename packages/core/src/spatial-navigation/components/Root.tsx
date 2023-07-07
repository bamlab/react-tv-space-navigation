import { ReactNode } from 'react';
import { ParentIdContext } from '../context/ParentIdContext';
import { SpatialNavigatorContext } from '../context/SpatialNavigatorContext';
import { useBeforeMountEffect } from '../hooks/useBeforeMountEffect';
import { useCreateSpatialNavigator } from '../hooks/useCreateSpatialNavigator';
import { useLockRootSpatialNavigator } from '../hooks/useLockRootSpatialNavigator';

const ROOT_ID = 'root';

type Props = { isActive: boolean; children: ReactNode };

export const SpatialNavigationRoot = ({ isActive = true, children }: Props) => {
  const spatialNavigator = useCreateSpatialNavigator();
  useBeforeMountEffect(() => {
    spatialNavigator.registerNode(ROOT_ID, { orientation: 'vertical' });
    return () => spatialNavigator.unregisterNode(ROOT_ID);
  }, []);

  useLockRootSpatialNavigator({
    spatialNavigator,
    isLocked: !isActive,
  });

  return (
    <SpatialNavigatorContext.Provider value={spatialNavigator}>
      <ParentIdContext.Provider value={ROOT_ID}>{children}</ParentIdContext.Provider>
    </SpatialNavigatorContext.Provider>
  );
};
