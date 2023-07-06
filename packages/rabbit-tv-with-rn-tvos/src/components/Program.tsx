import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useRabbitImageSource} from './useRabbitImageSource';

const Identity = ({children}: {children: React.ReactNode}) => <>{children}</>;

export const Program = ({
  isFocused = false,
  touchable = true,
}: {
  touchable?: boolean;
  isFocused?: boolean;
}) => {
  const imageSource = useRabbitImageSource();

  const Wrapper = touchable ? TouchableOpacity : Identity;

  return (
    <Wrapper>
      <Image
        style={[styles.programImage, isFocused && {transform: [{scale: 1.1}]}]}
        source={imageSource}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  programImage: {
    width: 200,
    height: 250,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
  },
});
