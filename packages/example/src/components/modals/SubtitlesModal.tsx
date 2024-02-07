import { useEffect } from 'react';
import { SpatialNavigationRoot } from '../../../../lib/src/spatial-navigation/components/Root';
import { DefaultFocus } from '../../../../lib/src/spatial-navigation/context/DefaultFocusContext';
import { useLockSpatialNavigation } from '../../../../lib/src/spatial-navigation/context/LockSpatialNavigationContext';
import { Button } from '../../design-system/components/Button';
import { Spacer } from '../../design-system/components/Spacer';
import { GenericModal } from './GenericModal';

interface SubtitlesModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  setSubtitles: (subtitles: string) => void;
}

export const SubtitlesModal = ({
  isModalVisible,
  setIsModalVisible,
  setSubtitles,
}: SubtitlesModalProps) => {
  const { lock, unlock } = useLockSpatialNavigation();

  // Locks the parent navigator when the modal is open and unlocks it when it's closed
  useEffect(() => {
    return () => {
      if (isModalVisible) {
        lock();
      } else {
        unlock();
      }
    };
  }, [isModalVisible, lock, unlock]);

  return (
    <SpatialNavigationRoot>
      <GenericModal isVisible={isModalVisible} title={'Choose subtitles'}>
        <DefaultFocus>
          <Button
            label="English"
            onSelect={() => {
              setSubtitles('English');
              setIsModalVisible(false);
            }}
          />
        </DefaultFocus>
        <Spacer gap="$8" />
        <Button
          label="Spanish"
          onSelect={() => {
            setSubtitles('Spanish');
            setIsModalVisible(false);
          }}
        />
        <Spacer gap="$8" />
        <Button
          label="Portuguese"
          onSelect={() => {
            setSubtitles('Portuguese');
            setIsModalVisible(false);
          }}
        />
        <Spacer gap="$8" />
        <Button
          label="None"
          onSelect={() => {
            setSubtitles('No');
            setIsModalVisible(false);
          }}
        />
      </GenericModal>
    </SpatialNavigationRoot>
  );
};
