import { useEffect } from 'react';
import { useLockSpatialNavigation } from '../../../lib/src/spatial-navigation/context/LockSpatialNavigationContext';
import { EventArg, useNavigation } from '@react-navigation/native';

interface UseLockProps {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
}

// This hook is used to lock the spatial navigation of parent navigator when a modal is open
// and to prevent the user from closing the modal by pressing the back button

export const useLockModal = ({ isModalVisible, setIsModalVisible }: UseLockProps) => {
  // Locks the parent navigator when the modal is open and unlocks it when it's closed
  const { lock, unlock } = useLockSpatialNavigation();
  useEffect(() => {
    if (isModalVisible) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [isModalVisible, lock, unlock]);

  // Prevents the user from closing the modal by pressing the back button
  const navigation = useNavigation();
  useEffect(() => {
    if (isModalVisible) {
      const navigationListener = (e: EventArg<'beforeRemove', true>) => {
        e.preventDefault();
        setIsModalVisible(false);
      };
      navigation.addListener('beforeRemove', navigationListener);
      return () => {
        navigation.removeListener('beforeRemove', navigationListener);
      };
    }
  }, [navigation, isModalVisible, setIsModalVisible]);
};
