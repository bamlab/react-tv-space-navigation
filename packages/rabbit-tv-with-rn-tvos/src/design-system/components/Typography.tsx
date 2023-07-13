import styled from '@emotion/native';
import { ReactNode } from 'react';
import { TextProps } from 'react-native';
import { type FontWeight, type TypographyVariant } from '../theme/typography';

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  fontWeight?: FontWeight;
  children?: ReactNode;
};

export const Typography = ({
  variant = 'body',
  fontWeight = 'regular',
  children,
  ...textProps
}: TypographyProps) => {
  return (
    <StyledText variant={variant} fontWeight={fontWeight} {...textProps}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.Text<{
  variant: TypographyVariant;
  fontWeight: FontWeight;
}>(({ variant, fontWeight, theme }) => ({
  ...theme.typography[variant][fontWeight],
  color: 'white',
  flexWrap: 'wrap',
}));
