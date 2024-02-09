import styled from '@emotion/native';
import { View } from 'react-native';

export const LeftArrow = () => {
  return <StyledLeftView />;
};

const StyledLeftView = styled(View)({
  width: 200,
  height: 300,
  opacity: 0.5,
  position: 'absolute',
  transform: [{ translateX: -100 }, { translateY: -50 }],
  zIndex: 1,
});

export const RihtArrow = () => {
  return <StyledRightView />;
};

const StyledRightView = styled(View)({
  width: 200,
  height: 300,
  opacity: 0.5,
  position: 'absolute',
  transform: [{ translateX: 100 }, { translateY: -50 }],
  zIndex: 1,
  top: 0,
  right: 0,
});
