import SpatialNavigator from '../SpatialNavigator';
import { useEffect, useMemo } from 'react';
import { keyboardSubscriber, keyboardUnsubscriber } from '../configureKeyboard';

export const useCreateSpatialNavigator = () => {
  const spatialNavigator = useMemo(() => new SpatialNavigator(), []);

  useEffect(() => {
    if (!keyboardSubscriber) {
      console.warn(
        '[React Spatial Navigation] You probably forgot to configure the keyboard. Please call the configuration function.',
      );

      return;
    }

    const listener = keyboardSubscriber((direction) => spatialNavigator.handleKeyDown(direction));
    return () => {
      if (!keyboardUnsubscriber) {
        console.warn(
          '[React Spatial Navigation] You did not provide a keyboard unsubscriber. Are you sure you called configuration correctly?',
        );

        return;
      }
      keyboardUnsubscriber(listener);
    };
  }, [spatialNavigator]);

  return spatialNavigator;
};
