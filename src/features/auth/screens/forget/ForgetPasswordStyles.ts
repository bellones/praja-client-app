import { StyleSheet } from 'react-native';
import { fontWeights } from '../../../../theme/fonts';
import { AppTheme } from '../../../../theme/types';

const createForgetPasswordStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing(4),
    },
    scrollView: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'flex-start',
    },
    formContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
    keyboardAvoidView: {
      flex: 1,
    },
    formTitle: {
      fontSize: theme.spacing(8),
      fontWeight: fontWeights.semiBold,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginBottom: theme.spacing(2),
    },
    formSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginBottom: theme.spacing(8),
    },
  });

export default createForgetPasswordStyles;





