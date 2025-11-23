import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { AppTheme, ThemeContextValue, ThemeMode, ThemePreference } from "./types";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
      Appearance.getColorScheme() as ColorSchemeName ?? 'light'
    );
    const [preference, setPreference] = useState<ThemePreference>('system');
  
    // Ouvir mudanças do sistema
    useEffect(() => {
      const sub = Appearance.addChangeListener(({ colorScheme }) => {
        setSystemScheme(colorScheme);
      });
      return () => sub.remove();
    }, []);
  
    const mode: ThemeMode = useMemo(() => {
      if (preference === 'system') {
        return (systemScheme ?? 'light') as ThemeMode;
      }
      return preference;
    }, [preference, systemScheme]);
  
    const theme = useMemo<AppTheme>(
      () => (mode === 'dark' ? darkTheme : lightTheme),
      [mode]
    );
  
    const value = useMemo(
      () => ({
        theme,
        mode,
        preference,
        setPreference,
      }),
      [theme, mode, preference]
    );
  
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  };
  
  export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
  };