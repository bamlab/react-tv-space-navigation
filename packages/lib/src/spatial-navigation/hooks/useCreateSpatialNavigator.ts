import SpatialNavigator, { OnDirectionHandledWithoutMovement } from '../SpatialNavigator';
import { useMemo } from 'react';

type SpatialNavigatorHookParams = {
  onDirectionHandledWithoutMovementRef: React.MutableRefObject<OnDirectionHandledWithoutMovement>;
};

export const useCreateSpatialNavigator = ({
  onDirectionHandledWithoutMovementRef,
}: SpatialNavigatorHookParams) => {
  const spatialNavigator = useMemo(
    () =>
      new SpatialNavigator({
        onDirectionHandledWithoutMovementRef,
      }),
    // This dependency should be safe and won't recreate a navigator every time since it's a ref
    [onDirectionHandledWithoutMovementRef],
  );

  return spatialNavigator;
};
