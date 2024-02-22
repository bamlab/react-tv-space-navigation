import SpatialNavigator from '../SpatialNavigator';
import { useEffect } from 'react';
import { remoteControlSubscriber, remoteControlUnsubscriber } from '../configureRemoteControl';
import { useDevice } from '../context/DeviceContext';

export const useRemoteControl = ({
  spatialNavigator,
  isActive,
}: {
  spatialNavigator: SpatialNavigator;
  isActive: boolean;
}) => {
  const { setDeviceType } = useDevice();
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

    const listener = remoteControlSubscriber(async (direction) => {
      setDeviceType('remoteKeys');
      await 0; // State update is async, but we need to wait for it to be done in order to handle the key event correctly
      spatialNavigator.handleKeyDown(direction);
    });
    return () => {
      if (!remoteControlUnsubscriber) {
        console.warn(
          '[React Spatial Navigation] You did not provide a remote control unsubscriber. Are you sure you called configuration correctly?',
        );

        return;
      }
      remoteControlUnsubscriber(listener);
    };
  }, [spatialNavigator, isActive, setDeviceType]);
};
