import { useCallback, useEffect } from 'react';
import { useLockSpatialNavigation } from '../../../../../lib/src/spatial-navigation/context/LockSpatialNavigationContext';
import { useKey } from '../../../hooks/useKey';
import { SupportedKeys } from '../../remote-control/SupportedKeys';

interface UseLockProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

// This hook is used to lock the spatial navigation of parent navigator when a modal is open
// and to prevent the user from closing the modal by pressing the back button
export const useLockOverlay = ({ isModalVisible, hideModal }: UseLockProps) => {
  useLockParentSpatialNavigator(isModalVisible);
  usePreventNavigationGoBack(isModalVisible, hideModal);
};

const useLockParentSpatialNavigator = (isModalVisible: boolean) => {
  const { lock, unlock } = useLockSpatialNavigation();
  useEffect(() => {
    if (isModalVisible) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [isModalVisible, lock, unlock]);
};

const usePreventNavigationGoBack = (isModalVisible: boolean, hideModal: () => void) => {
  const hideModalListener = useCallback(() => {
    if (isModalVisible) {
      hideModal();
      return true;
    }
    return false;
  }, [isModalVisible, hideModal]);
  useKey(SupportedKeys.Back, hideModalListener);
};
