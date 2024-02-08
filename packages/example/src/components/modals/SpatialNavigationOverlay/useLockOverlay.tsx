import { useEffect } from 'react';
import { useLockSpatialNavigation } from '../../../../../lib/src/spatial-navigation/context/LockSpatialNavigationContext';
import { EventArg, useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  useEffect(() => {
    if (isModalVisible) {
      const navigationListener = (e: EventArg<'beforeRemove', true>) => {
        e.preventDefault();
        hideModal();
      };
      navigation.addListener('beforeRemove', navigationListener);
      return () => {
        navigation.removeListener('beforeRemove', navigationListener);
      };
    }
  }, [navigation, isModalVisible, hideModal]);
};
