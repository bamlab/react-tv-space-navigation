import SpatialNavigator, { OnDirectionHandledWithoutMovement } from '../SpatialNavigator';
import { useEffect, useMemo } from 'react';
import { remoteControlSubscriber, remoteControlUnsubscriber } from '../configureRemoteControl';

type SpatialNavigatorHookParams = {
  onDirectionHandledWithoutMovementRef: React.MutableRefObject<OnDirectionHandledWithoutMovement>;
  isActive: boolean;
};

export const useCreateSpatialNavigator = ({
  onDirectionHandledWithoutMovementRef,
  isActive,
}: SpatialNavigatorHookParams) => {
  const spatialNavigator = useMemo(
    () =>
      new SpatialNavigator({
        onDirectionHandledWithoutMovementRef,
      }),
    // This dependency should be safe and won't recreate a navigator every time since it's a ref
    [onDirectionHandledWithoutMovementRef],
  );

  useEffect(() => {
    if (!remoteControlSubscriber) {
      console.warn(
        '[React Spatial Navigation] You probably forgot to configure the remote control. Please call the configuration function.',
      );

      return;
    }

    if (!isActive) {
      return () => undefined;
    }

    const listener = remoteControlSubscriber((direction) =>
      spatialNavigator.handleKeyDown(direction),
    );
    return () => {
      if (!remoteControlUnsubscriber) {
        console.warn(
          '[React Spatial Navigation] You did not provide a remote control unsubscriber. Are you sure you called configuration correctly?',
        );

        return;
      }
      remoteControlUnsubscriber(listener);
    };
  }, [spatialNavigator, isActive]);

  return spatialNavigator;
};
