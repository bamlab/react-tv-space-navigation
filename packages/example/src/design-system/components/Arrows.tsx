import styled from '@emotion/native';
import { Dimensions, View, Image } from 'react-native';
import { theme } from '../theme/theme';
import arrowSource from '../assets/arrow-left.png';

const windowDimensions = Dimensions.get('window');

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
