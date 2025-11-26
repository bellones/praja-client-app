import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../theme/types';

export const createCategoryDetailsStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      backgroundColor: theme.colors.background,
    },
    errorText: {
      fontSize: 16,
      color: theme.colors.danger,
      fontFamily: theme.fonts.primary,
      textAlign: 'center',
    },
    emptyContainer: {
      padding: theme.spacing(4),
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
    },
  });




