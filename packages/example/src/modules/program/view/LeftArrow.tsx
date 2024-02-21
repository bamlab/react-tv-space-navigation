import styled from '@emotion/native';
import { Dimensions, View, Image } from 'react-native';
import { theme } from '../../../design-system/theme/theme';

const windowDimensions = Dimensions.get('window');
const arrowSource = require('../assets/arrow-left.png');

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
      <LeftArrowImage source={arrowSource} />
    </StyledLeftView>
  );
};

export const RihtArrow = () => {
  return (
    <StyledRightView>
      <RightArrowImage source={arrowSource} />
    </StyledRightView>
  );
};

const StyledVerticalScrollZone = styled(View)({
  width: windowDimensions.width - theme.sizes.menu.closed,
  height: 100,
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledTopView = styled(StyledVerticalScrollZone)({
  top: 20,
});

const StyledBottomView = styled(StyledVerticalScrollZone)({
  bottom: -15,
});

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
  return (
    <StyledBottomView>
      <BottomArrowImage source={arrowSource} />
    </StyledBottomView>
  );
};

export const TopArrow = () => {
  return (
    <StyledTopView>
      <TopArrowImage source={arrowSource} />
    </StyledTopView>
  );
};
