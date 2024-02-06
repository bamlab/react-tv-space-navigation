import styled from '@emotion/native';
import React from 'react';
import { View, ModalProps } from 'react-native';
import { Typography } from '../../design-system/components/Typography';
import { Spacer } from '../../design-system/components/Spacer';

type CustomModalProps = ModalProps & {
  isVisible: boolean;
  children: React.ReactNode;
  title: string;
};

export const GenericModal: React.FC<CustomModalProps> = ({ isVisible, children, title }) => {
  if (!isVisible) return null;

  return (
    <StyledModal>
      <ModalContentContainer>
        <Typography variant="title" fontWeight="strong">
          {title}
        </Typography>
        <Spacer gap="$8" />
        {children}
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
  backgroundColor: 'grey',
  padding: 32,
  margin: 16,
  borderRadius: 16,
  justifyContent: 'center',
});
