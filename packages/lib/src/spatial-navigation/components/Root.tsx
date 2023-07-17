import { ReactNode, useRef } from 'react';
import { ParentIdContext } from '../context/ParentIdContext';
import { SpatialNavigatorContext } from '../context/SpatialNavigatorContext';
import { useBeforeMountEffect } from '../hooks/useBeforeMountEffect';
import { useCreateSpatialNavigator } from '../hooks/useCreateSpatialNavigator';
import { useLockRootSpatialNavigator } from '../hooks/useLockRootSpatialNavigator';
import { OnDirectionHandledWithMovement } from '../SpatialNavigator';

const ROOT_ID = 'root';

type Props = {
  /**
   * Determines if the spatial navigation is active.
   * If false, the spatial navigation will be locked, and no nodes can be focused.
   * This is useful to handle a multi page app: you can disable the non-focused pages' spatial navigation roots.
   */
  isActive?: boolean;
  /**
   * Called when you're reaching a border of the navigator.
   * A use case for this would be the implementation of a side menu
   * that's shared between pages. You can have a separate navigator
   * for your side menu, which would be common across pages, and you'd
   * make this menu active when you reach the left side of your page navigator.
   */
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
