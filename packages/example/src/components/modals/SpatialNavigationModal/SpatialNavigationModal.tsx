import { SpatialNavigationRoot } from '../../../../../lib/src/spatial-navigation/components/Root';
import { useLockModal } from './useLockModal';

type SpatialNavigationModalProps = {
  isModalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};

export const SpatialNavigationModal = ({
  isModalVisible,
  hideModal,
  children,
}: SpatialNavigationModalProps) => {
  useLockModal({ isModalVisible, hideModal });

  return <SpatialNavigationRoot>{children}</SpatialNavigationRoot>;
};
