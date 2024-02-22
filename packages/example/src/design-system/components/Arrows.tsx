import styled from '@emotion/native';
import { Image } from 'react-native';
import arrowSource from '../assets/arrow-left.png';

const LeftArrowImage = styled(Image)({
  height: 70,
  width: 50,
  resizeMode: 'stretch',
  transform: [{ rotate: '180deg' }],
  tintColor: 'white',
});

const RightArrowImage = styled(Image)({
  height: 70,
  width: 50,
  resizeMode: 'stretch',
  tintColor: 'white',
});

export const LeftArrow = () => {
  return <LeftArrowImage source={arrowSource} />;
};

export const RightArrow = () => {
  return <RightArrowImage source={arrowSource} />;
};

const BottomArrowImage = styled(Image)({
  height: 70,
  width: 50,
  resizeMode: 'stretch',
  transform: [{ rotate: '90deg' }],
  tintColor: 'white',
});

const TopArrowImage = styled(Image)({
  height: 70,
  width: 50,
  resizeMode: 'stretch',
  transform: [{ rotate: '270deg' }],
  tintColor: 'white',
});

export const BottomArrow = () => {
  return <BottomArrowImage source={arrowSource} />;
};

export const TopArrow = () => {
  return <TopArrowImage source={arrowSource} />;
};
