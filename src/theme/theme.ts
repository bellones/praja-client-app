// src/theme/themes.ts
import { colors } from './color';
import { AppTheme } from './types';

const base = {
  fonts: {
    primary: 'Poppins',
    secondary: 'Montserrat',
  },
  spacing: (m: number) => 4 * m,
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    pill: 999,
  },
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: colors.white,
    surface: colors.gray100,
    primary: colors.primary,
    primaryText: colors.textInverse,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.border,
    danger: colors.error,
    success: colors.success,
    disabled: colors.textDisabled,
  },
  ...base,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: colors.black,
    surface: colors.gray900,
    primary: colors.primary,
    primaryText: colors.textInverse,
    text: colors.textInverse,
    textSecondary: colors.gray500,
    border: colors.gray700,
    danger: colors.error,
    success: colors.success,
    disabled: colors.gray600,
  },
  ...base,
};
