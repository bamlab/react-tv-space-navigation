import styled from '@emotion/native';
import { View } from 'react-native';
import { colors } from '../../../design-system/theme/colors';

export const LeftArrow = () => {
  return <StyledLeftView />;
};

const StyledLeftView = styled(View)({
  width: 200,
  height: 400,
  opacity: 0.2,
  position: 'absolute',
  backgroundColor: colors.background.light,
  transform: [{ translateX: -100 }, { translateY: -50 }],
});

export const RihtArrow = () => {
  return <StyledRightView />;
};

const StyledRightView = styled(View)({
  width: 200,
  height: 400,
  opacity: 0.2,
  position: 'absolute',
  backgroundColor: colors.background.light,
  transform: [{ translateX: 100 }, { translateY: -50 }],
  top: 0,
  right: 0,
});
