
export type AppColors = {
    background: string;
    surface: string;
    primary: string;
    primaryText: string;
    text: string;
    textSecondary: string;
    border: string;
    danger: string;
    success: string;
    disabled: string;
  };

export type AppFonts = {
    primary: string;
    secondary: string;
  };
  
  export type AppTheme = {
    mode: 'light' | 'dark';
    colors: AppColors;
    fonts: AppFonts;
    spacing: (multiplier: number) => number;
    radius: {
      sm: number;
      md: number;
      lg: number;
      pill: number;
    };
  };
  

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

export type ThemeContextValue = {
    theme: AppTheme;
    mode: ThemeMode;
    preference: ThemePreference;
    setPreference: (pref: ThemePreference) => void;
  };