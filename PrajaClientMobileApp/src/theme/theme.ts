// src/theme/themes.ts
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
    background: '#FFFFFF',
    surface: '#F5F5F5',
    primary: '#000000',
    primaryText: '#FFFFFF',
    text: '#111111',
    textSecondary: '#666666',
    border: '#DDDDDD',
    danger: '#E53935',
    success: '#43A047',
    disabled: '#BDBDBD',
  },
  ...base,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#000000',
    surface: '#121212',
    primary: '#FFFFFF',
    primaryText: '#000000',
    text: '#F5F5F5',
    textSecondary: '#B0B0B0',
    border: '#333333',
    danger: '#EF5350',
    success: '#66BB6A',
    disabled: '#555555',
  },
  ...base,
};
