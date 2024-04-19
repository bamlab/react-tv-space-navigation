import { ReactNode, useEffect, useRef } from 'react';
import { ParentIdContext } from '../context/ParentIdContext';
import { SpatialNavigatorContext } from '../context/SpatialNavigatorContext';
import { useCreateSpatialNavigator } from '../hooks/useCreateSpatialNavigator';
import { useRemoteControl } from '../hooks/useRemoteControl';
import { OnDirectionHandledWithoutMovement } from '../SpatialNavigator';
import { LockSpatialNavigationContext, useIsLocked } from '../context/LockSpatialNavigationContext';
import { IsRootActiveContext } from '../context/IsRootActiveContext';

const ROOT_ID = 'root';

type Props = {
  /**
   * Determines if the spatial navigation is active.
   * If false, the spatial navigation will be locked, and no nodes can be focused.
   * This is useful to handle a multi page app: you can disable the non-focused pages' spatial navigation roots.
   *
   * Note: this is a little redundant with the lock system, but it's useful to have a way to disable the spatial navigation from above AND from below.
   */
  isActive?: boolean;
  /**
   * Called when you're reaching a border of the navigator.
   * A use case for this would be the implementation of a side menu
   * that's shared between pages. You can have a separate navigator
   * for your side menu, which would be common across pages, and you'd
   * make this menu active when you reach the left side of your page navigator.
   */
  onDirectionHandledWithoutMovement?: OnDirectionHandledWithoutMovement;
  children: ReactNode;
};

export const SpatialNavigationRoot = ({
  isActive = true,
  onDirectionHandledWithoutMovement = () => undefined,
  children,
}: Props) => {
  // We can't follow the react philosophy here: we can't recreate a navigator if this function changes
  // so we'll have to store its ref and update the ref if there is a new value to this function
  const onDirectionHandledWithoutMovementRef = useRef<OnDirectionHandledWithoutMovement>(
    () => undefined,
  );
  // Update the ref at every render
  onDirectionHandledWithoutMovementRef.current = onDirectionHandledWithoutMovement;

  const spatialNavigator = useCreateSpatialNavigator({
    onDirectionHandledWithoutMovementRef,
  });

  const { isLocked, lockActions } = useIsLocked();

  const isRootActive = isActive && !isLocked;
  useRemoteControl({ spatialNavigator, isActive: isRootActive });

  useEffect(() => {
    spatialNavigator.registerNode(ROOT_ID, { orientation: 'vertical' });
    return () => spatialNavigator.unregisterNode(ROOT_ID);
  }, [spatialNavigator]);

  return (
    <SpatialNavigatorContext.Provider value={spatialNavigator}>
      <LockSpatialNavigationContext.Provider value={lockActions}>
        <IsRootActiveContext.Provider value={isRootActive}>
          <ParentIdContext.Provider value={ROOT_ID}>{children}</ParentIdContext.Provider>
        </IsRootActiveContext.Provider>
      </LockSpatialNavigationContext.Provider>
    </SpatialNavigatorContext.Provider>
  );
};
