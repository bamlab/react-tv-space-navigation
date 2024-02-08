import { SpatialNavigationRoot } from '../../../../../lib/src/spatial-navigation/components/Root';
import { useLockModal } from './useLockModal';

type SpatialNavigationModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  children: React.ReactNode;
};

export const SpatialNavigationModal = ({
  isModalVisible,
  setIsModalVisible,
  children,
}: SpatialNavigationModalProps) => {
  useLockModal({ isModalVisible, setIsModalVisible });

  return <SpatialNavigationRoot>{children}</SpatialNavigationRoot>;
};
