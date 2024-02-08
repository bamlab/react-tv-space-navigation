import styled from '@emotion/native';
import React from 'react';
import { View, ModalProps } from 'react-native';
import { Typography } from '../../design-system/components/Typography';
import { Spacer } from '../../design-system/components/Spacer';
import { colors } from '../../design-system/theme/colors';
import { SpatialNavigationModal } from './SpatialNavigationModal/SpatialNavigationModal';

type CustomModalProps = ModalProps & {
  isModalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ isModalVisible, hideModal, children, title }: CustomModalProps) => {
  if (!isModalVisible) return null;

  return (
    <StyledModal>
      <ModalContentContainer>
        <SpatialNavigationModal isModalVisible={isModalVisible} hideModal={hideModal}>
          <Typography variant="title" fontWeight="strong">
            {title}
          </Typography>
          <Spacer gap="$8" />
          {children}
        </SpatialNavigationModal>
      </ModalContentContainer>
    </StyledModal>
  );
};

const StyledModal = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalContentContainer = styled(View)({
  minHeight: 200,
  minWidth: 200,
  backgroundColor: colors.background.main,
  borderWidth: 2,
  borderColor: colors.primary.light,
  padding: 32,
  margin: 16,
  borderRadius: 16,
  justifyContent: 'center',
});
