import styled from '@emotion/native';
import { Dimensions, View } from 'react-native';
import { colors } from '../../../design-system/theme/colors';

export const LeftArrow = () => {
  return <StyledLeftView />;
};

const windowDimensions = Dimensions.get('window');

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

export const TopArrow = () => {
  return <StyledTopView />;
};

const StyledTopView = styled(View)({
  width: windowDimensions.width,
  height: 120,
  opacity: 0.2,
  position: 'absolute',
  backgroundColor: 'red',
  top: 0,
});

export const BottomArrow = () => {
  return <StyledBottomView />;
};

const StyledBottomView = styled(View)({
  width: windowDimensions.width,
  height: 120,
  opacity: 0.2,
  position: 'absolute',
  backgroundColor: 'red',
  bottom: 0,
});
