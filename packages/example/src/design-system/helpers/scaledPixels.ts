import { Dimensions } from 'react-native';

export const screen = Dimensions.get('window');
const scale = (screen.width || 1920) / 1920;

/**
 * Unfortunately, AndroidTV handles pixels in a strange manner
 * PixelRatio does not seem to solve the problem properly on web.
 * So we just scale the pixels manually.
 *
 * https://github.com/react-native-tvos/react-native-tvos/issues/57
 */
export const scaledPixels = (pixels: number) => pixels * scale;
