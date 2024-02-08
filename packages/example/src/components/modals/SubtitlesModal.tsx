import { DefaultFocus } from '../../../../lib/src/spatial-navigation/context/DefaultFocusContext';
import { Button } from '../../design-system/components/Button';
import { Spacer } from '../../design-system/components/Spacer';
import { Modal } from './Modal';
import { useLockModal } from '../../hooks/useLockModal';

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
  useLockModal({ isModalVisible, setIsModalVisible });

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      title={'Choose subtitles'}
    >
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
    </Modal>
  );
};
