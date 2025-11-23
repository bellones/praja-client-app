import { StyleSheet } from 'react-native';
import { fontWeights } from '../../../../theme/fonts';
import { AppTheme } from '../../../../theme/types';
 const createLoginStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing(4),
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  row: { 
    flexDirection: 'row',
    marginBottom: theme.spacing(4),
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
  scrollView: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  keyboardAvoidView: {
    flex: 1,
  },
});

export default createLoginStyles;