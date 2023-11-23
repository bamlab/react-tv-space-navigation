import SpatialNavigator from '../SpatialNavigator';
import { useEffect } from 'react';
import { remoteControlSubscriber, remoteControlUnsubscriber } from '../configureRemoteControl';

export const useRemoteControl = ({
  spatialNavigator,
  isActive,
}: {
  spatialNavigator: SpatialNavigator;
  isActive: boolean;
}) => {
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
};
