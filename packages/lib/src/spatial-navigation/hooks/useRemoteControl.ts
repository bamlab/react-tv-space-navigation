import SpatialNavigator from '../SpatialNavigator';
import { useEffect } from 'react';
import {
  getRemoteControlSubscriber,
  getRemoteControlUnsubscriber,
} from '../configureRemoteControl';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';

export const useRemoteControl = ({
  spatialNavigator,
  isActive,
}: {
  spatialNavigator: SpatialNavigator;
  isActive: boolean;
}) => {
  const { setDeviceType, setScrollingIntervalId: setScrollingId } =
    useSpatialNavigationDeviceType();
  useEffect(() => {
    if (!getRemoteControlSubscriber()) {
      console.warn(
        '[React Spatial Navigation] You probably forgot to configure the remote control. Please call the configuration function.',
      );

      return;
    }

    if (!isActive) {
      return () => undefined;
    }

    const listener = getRemoteControlSubscriber()?.((direction) => {
      setDeviceType('remoteKeys');
      spatialNavigator.handleKeyDown(direction);
      setScrollingId(null);
    });
    return () => {
      if (!getRemoteControlUnsubscriber()) {
        console.warn(
          '[React Spatial Navigation] You did not provide a remote control unsubscriber. Are you sure you called configuration correctly?',
        );

        return;
      }
      getRemoteControlUnsubscriber()?.(listener);
    };
  }, [spatialNavigator, isActive, setDeviceType, setScrollingId]);
};
