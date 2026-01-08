import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../../theme/types';

export const createConversationsStyles = (theme: AppTheme) =>
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
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
    },
  });

export default createConversationsStyles;
