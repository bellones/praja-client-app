import { StyleSheet } from 'react-native';
import { fontWeights } from '../../../../theme/fonts';
import { AppTheme } from '../../../../theme/types';

export const createSplashStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 196,
    height: 196,
    resizeMode: 'contain',
  },
  row: { 
    flexDirection: 'row' 
  },
  titleOne: {
    fontSize: 36,
    fontWeight: fontWeights.bold,
    color: theme.colors.text,
    fontFamily: theme.fonts.primary,
  },
  titleTwo: {
    fontSize: 36,
    fontWeight: fontWeights.bold,
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary,
  },
  normalText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing(1),
    fontFamily: theme.fonts.primary,
  },
});