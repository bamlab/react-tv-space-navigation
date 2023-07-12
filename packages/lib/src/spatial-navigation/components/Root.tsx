import { ReactNode, useRef } from 'react';
import { ParentIdContext } from '../context/ParentIdContext';
import { SpatialNavigatorContext } from '../context/SpatialNavigatorContext';
import { useBeforeMountEffect } from '../hooks/useBeforeMountEffect';
import { useCreateSpatialNavigator } from '../hooks/useCreateSpatialNavigator';
import { useLockRootSpatialNavigator } from '../hooks/useLockRootSpatialNavigator';
import { OnDirectionHandledWithMovement } from '../SpatialNavigator';

const ROOT_ID = 'root';

type Props = {
  isActive?: boolean;
  onDirectionHandledWithoutMovement?: OnDirectionHandledWithMovement;
  children: ReactNode;
};

export const SpatialNavigationRoot = ({
  isActive = true,
  onDirectionHandledWithoutMovement = () => undefined,
  children,
}: Props) => {
  // We can't follow the react philosophy here: we can't recreate a navigator if this function changes
  // so we'll have to store its ref and update the ref if there is a new value to this function
  const onDirectionHandledWithoutMovementRef = useRef<OnDirectionHandledWithMovement>(
    () => undefined,
  );
  // Update the ref at every render
  onDirectionHandledWithoutMovementRef.current = onDirectionHandledWithoutMovement;

  const spatialNavigator = useCreateSpatialNavigator({ onDirectionHandledWithoutMovementRef });
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
