import { iife } from '../util/iife';

/**
 *
 * @param color Hexadecimal color in the format #ffddff
 * @param opacity Opacity between 0 and 1
 */
export const alpha = (color: string, opacity: number) => {
  const rangedOpacity = iife(() => {
    if (opacity < 0) {
      return 0;
    }
    if (opacity > 1) {
      return 1;
    }
    return opacity;
  });

  const scaled = rangedOpacity * 255;

  const hexOpacity = scaled.toString(16);

  const twoDigitHexOpcity = iife(() => {
    if (hexOpacity.length < 2) {
      return `0${hexOpacity}`;
    }
    return hexOpacity;
  });

  return `${color}${twoDigitHexOpcity}`;
};
