import { StyleSheet } from "react-native";
import { AppTheme } from "../../../../theme/types";

const createProfileStyles = (theme: AppTheme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing(4),
      },
      content: {
        // flex: 1,
        // justifyContent: 'space-between',
      },
      userInfo: {
        marginTop: theme.spacing(4),
      },
      label: {
        fontSize: 14,
        fontFamily: theme.fonts.primary,
        fontWeight: '500',
        color: theme.colors.textSecondary,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
      },
      value: {
        fontSize: 16,
        fontFamily: theme.fonts.primary,
        fontWeight: '400',
        color: theme.colors.text,
      },
      title: {
        fontSize: 28,
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary,
    },
    });

export default createProfileStyles;