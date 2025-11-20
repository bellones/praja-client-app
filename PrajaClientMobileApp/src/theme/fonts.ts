/**
 * Font weight mappings for Poppins and Montserrat
 * Use these with fontFamily and fontWeight in React Native
 */

export const fontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

/**
 * Helper function to create font style object
 * @param fontFamily - Font family name (from theme.fonts.primary or theme.fonts.secondary)
 * @param weight - Font weight (use fontWeights or string)
 * @param italic - Whether to use italic variant
 */
export const createFontStyle = (
  fontFamily: string,
  weight: keyof typeof fontWeights | string = 'regular',
  italic: boolean = false
) => {
  const fontWeight = typeof weight === 'string' && weight in fontWeights
    ? fontWeights[weight as keyof typeof fontWeights]
    : weight;

  return {
    fontFamily: italic ? `${fontFamily}-Italic` : fontFamily,
    fontWeight: typeof fontWeight === 'string' ? fontWeight : fontWeights[weight as keyof typeof fontWeights],
    fontStyle: italic ? 'italic' : 'normal',
  };
};

