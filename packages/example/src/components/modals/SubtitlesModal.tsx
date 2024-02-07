import { useEffect } from 'react';
import { SpatialNavigationRoot } from '../../../../lib/src/spatial-navigation/components/Root';
import { DefaultFocus } from '../../../../lib/src/spatial-navigation/context/DefaultFocusContext';
import { useLockSpatialNavigation } from '../../../../lib/src/spatial-navigation/context/LockSpatialNavigationContext';
import { Button } from '../../design-system/components/Button';
import { Spacer } from '../../design-system/components/Spacer';
import { GenericModal } from './GenericModal';
import { SupportedKeys } from '../remote-control/SupportedKeys';
import RemoteControlManager from '../remote-control/RemoteControlManager';
import { useIsFirstRender } from '../../hooks/useIsFirstRender';
import { useGoBack } from '../GoBack/GoBackContext';

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
  const isFirstRender = useIsFirstRender();
  const { setIsGoBackActive } = useGoBack();

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (isModalVisible && pressedKey === SupportedKeys.Back) {
        setIsModalVisible(false);
      }
    };
    RemoteControlManager.addKeydownListener(remoteControlListener);

    // Locks the parent spatial navigator when the modal is open and unlocks it when it's closed
    if (!isFirstRender) {
      if (isModalVisible) {
        setIsGoBackActive(false);
        lock();
      } else {
        setIsGoBackActive(true);
        unlock();
      }
    }

    // Cleanup
    return () => {
      RemoteControlManager.removeKeydownListener(remoteControlListener);
    };
  }, [isModalVisible, lock, unlock, setIsModalVisible, isFirstRender, setIsGoBackActive]);

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
