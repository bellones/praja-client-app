export const colors = {
    // Primary colors
    primary: '#FFC107',
    primaryDark: '#FF8F00',
    primaryLight: '#FFECB3',
    
    // Secondary colors
    secondary: '#2196F3',
    secondaryDark: '#1976D2',
    secondaryLight: '#BBDEFB',
    
    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
    
    // Semantic colors
    success: '#4CAF50',
    successLight: '#C8E6C9',
    warning: '#FF9800',
    warningLight: '#FFE0B2',
    error: '#F44336',
    errorLight: '#FFCDD2',
    info: '#2196F3',
    infoLight: '#BBDEFB',
    
    // Text colors
    textPrimary: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',
    textDisabled: '#CCCCCC',
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F5F5F5',
    
    // Border colors
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    borderDark: '#CCCCCC',
    
    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
  } as const;
  
  export type Colors = typeof colors;