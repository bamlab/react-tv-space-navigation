import { useEffect } from 'react';
import { TVEventControl, useTVEventHandler } from 'react-native';
import { panEventHandler } from './panEventHandler';

export const useTVPanEvent = () => {
  useEffect(() => {
    TVEventControl.enableTVPanGesture();
    return () => {
      TVEventControl.disableTVPanGesture();
    };
  }, []);
  useTVEventHandler(panEventHandler);
};
