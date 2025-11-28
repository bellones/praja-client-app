import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../theme/types';

export const createProfileStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flexGrow: 1,
    },
    content: {
      paddingTop: theme.spacing(2),
    },
    menuSection: {
      marginTop: theme.spacing(2),
      backgroundColor: theme.colors.background,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: theme.spacing(4),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
    },
    errorText: {
      fontSize: 16,
      color: theme.colors.danger,
      fontFamily: theme.fonts.primary,
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
  });

