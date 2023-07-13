import type { ViewStyle } from 'react-native';

import styled from '@emotion/native';
import { type ReactNode } from 'react';
import { View } from 'react-native';

import { type Theme } from '../theme/theme.types';

type BoxDirection = 'vertical' | 'horizontal';

interface Props {
  direction?: BoxDirection;
  flex?: ViewStyle['flex'];
  flexWrap?: ViewStyle['flexWrap'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  paddingHorizontal?: keyof Theme['spacings'];
  paddingVertical?: keyof Theme['spacings'];
  paddingBottom?: keyof Theme['spacings'];
  paddingRight?: keyof Theme['spacings'];
  paddingLeft?: keyof Theme['spacings'];
  paddingTop?: keyof Theme['spacings'];
  padding?: keyof Theme['spacings'];
  testID?: string;
  children: ReactNode;
}

export const Box = ({ direction = 'vertical', children, ...otherProps }: Props) => {
  return (
    <StyledView direction={direction} {...otherProps}>
      {children}
    </StyledView>
  );
};

const StyledView = styled(View, {
  // direction prop is a reserved prop in React Native and should therefore not be forwarded !
  shouldForwardProp: (propName) => propName !== 'direction',
})<Props & { direction: BoxDirection }>(
  ({
    direction,
    flex,
    flexWrap,
    alignItems,
    justifyContent,
    paddingHorizontal,
    paddingVertical,
    paddingBottom,
    paddingRight,
    paddingLeft,
    paddingTop,
    padding,
    theme,
  }) => ({
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    ...(flex && { flex }),
    ...(flexWrap && { flexWrap }),
    ...(alignItems && { alignItems }),
    ...(justifyContent && { justifyContent }),
    paddingHorizontal: paddingHorizontal && theme.spacings[paddingHorizontal],
    paddingVertical: paddingVertical && theme.spacings[paddingVertical],
    paddingBottom: paddingBottom && theme.spacings[paddingBottom],
    paddingRight: paddingRight && theme.spacings[paddingRight],
    paddingLeft: paddingLeft && theme.spacings[paddingLeft],
    paddingTop: paddingTop && theme.spacings[paddingTop],
    padding: padding && theme.spacings[padding],
    alignSelf: 'stretch',
  }),
);
