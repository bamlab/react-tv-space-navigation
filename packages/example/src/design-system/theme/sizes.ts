import { scaledPixels } from '../helpers/scaledPixels';

export const sizes = {
  program: {
    landscape: { width: scaledPixels(250), height: scaledPixels(200) },
    portrait: { width: scaledPixels(200), height: scaledPixels(250) },
  },
  menu: {
    open: scaledPixels(200),
    closed: scaledPixels(80),
  },
};
