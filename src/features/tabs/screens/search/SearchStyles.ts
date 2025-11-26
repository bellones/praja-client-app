import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../theme/types';

export const createSearchStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flexGrow: 1,
      paddingBottom: theme.spacing(4),
    },
    section: {
      marginTop: theme.spacing(4),
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginHorizontal: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: theme.spacing(2),
    },
    categoryGrid3Col: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: theme.spacing(2),
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    errorText: {
      fontSize: 16,
      color: theme.colors.danger,
      fontFamily: theme.fonts.primary,
      textAlign: 'center',
    },
    sectionTitleSkeleton: {
      height: 20,
      width: 150,
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      marginHorizontal: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    skeletonCardContainer: {
      width: 128,
      marginHorizontal: theme.spacing(1),
    },
    skeletonRow: {
      flexDirection: 'row',
    },
  });



