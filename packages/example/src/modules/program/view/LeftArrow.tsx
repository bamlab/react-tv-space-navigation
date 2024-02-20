import styled from '@emotion/native';
import { Dimensions, View, Image } from 'react-native';

const windowDimensions = Dimensions.get('window');

const StyledScrollZone = styled(View)({
  width: 120,
  height: 400,
  position: 'absolute',
  top: -98,
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledLeftView = styled(StyledScrollZone)({
  left: -62,
});

const StyledRightView = styled(StyledScrollZone)({
  right: -62,
});

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
  return (
    <StyledLeftView>
      <LeftArrowImage source={require('../assets/arrow-left.png')} />
    </StyledLeftView>
  );
};

export const RihtArrow = () => {
  return (
    <StyledRightView>
      <RightArrowImage source={require('../assets/arrow-left.png')} />
    </StyledRightView>
  );
};

const StyledVerticalScrollZone = styled(View)({
  width: windowDimensions.width,
  height: 120,
  opacity: 0.2,
  position: 'absolute',
  backgroundColor: 'red',
});

const StyledTopView = styled(StyledVerticalScrollZone)({
  top: 0,
});

const StyledBottomView = styled(StyledVerticalScrollZone)({
  bottom: 0,
});

export const BottomArrow = () => {
  return <StyledBottomView />;
};

export const TopArrow = () => {
  return <StyledTopView />;
};
