
import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface IAppStatusBar {
  backgroundColor?: string;
  barStyle?: StatusBarStyle | null | undefined;
}

export const AppStatusBar = ({backgroundColor, barStyle}: IAppStatusBar) => {

  const { theme } = useTheme();
  return (
    <StatusBar
      backgroundColor={
        backgroundColor !== undefined ? backgroundColor : theme.colors.background
      }
      barStyle={
        barStyle !== undefined ? barStyle : theme.colors.primary as StatusBarStyle
      }
    />
  );
};