import SpatialNavigator from '../SpatialNavigator';
import { useEffect, useMemo } from 'react';
import { remoteControlSubscriber, remoteControlUnsubscriber } from '../configureRemoteControl';

export const useCreateSpatialNavigator = () => {
  const spatialNavigator = useMemo(() => new SpatialNavigator(), []);

  useEffect(() => {
    if (!remoteControlSubscriber) {
      console.warn(
        '[React Spatial Navigation] You probably forgot to configure the remote control. Please call the configuration function.',
      );

      return;
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
  }, [spatialNavigator]);

  return spatialNavigator;
};
