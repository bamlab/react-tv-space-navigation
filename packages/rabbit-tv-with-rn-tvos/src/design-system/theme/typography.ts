export const fontFamilies = {
  montserrat: {
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },
};

export const typography = {
  title: {
    regular: {
      fontFamily: fontFamilies.montserrat.semiBold,
      fontSize: 32,
      lineHeight: 40,
    },
    strong: {
      fontFamily: fontFamilies.montserrat.bold,
      fontSize: 32,
      lineHeight: 40,
    },
  },
  body: {
    regular: {
      fontFamily: fontFamilies.montserrat.medium,
      fontSize: 24,
      lineHeight: 32,
    },
    strong: {
      fontFamily: fontFamilies.montserrat.semiBold,
      fontSize: 24,
      lineHeight: 32,
    },
  },
} as const;

export type TypographyVariant = keyof typeof typography;

export type FontWeight = 'regular' | 'strong';
