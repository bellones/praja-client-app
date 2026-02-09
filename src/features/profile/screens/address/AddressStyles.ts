import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../theme/types';

export const createAddressStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
    text: {
      fontSize: 24,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    link: {
      fontSize: 16,
      color: theme.colors.primary,
      fontFamily: theme.fonts.primary,
    },
  });

export default createAddressStyles;
