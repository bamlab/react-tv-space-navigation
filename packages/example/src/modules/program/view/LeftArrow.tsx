import styled from '@emotion/native';
import { View } from 'react-native';

export const LeftArrow = () => {
  return <StyledLeftView />;
};

const StyledLeftView = styled(View)({
  width: 300,
  height: 200,
  backgroundColor: 'red',
  opacity: 0.5,
  position: 'absolute',
  transform: [{ translateX: -100 }],
  zIndex: 1,
  top: 0,
});

export const RihtArrow = () => {
  return <StyledRightView />;
};

const StyledRightView = styled(View)({
  width: 300,
  height: 200,
  backgroundColor: 'red',
  opacity: 0.5,
  position: 'absolute',
  transform: [{ translateX: 100 }],
  zIndex: 1,
  top: 0,
  right: 0,
});
