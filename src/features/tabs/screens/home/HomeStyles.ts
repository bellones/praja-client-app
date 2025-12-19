import { StyleSheet } from "react-native";
import { AppTheme } from "../../../../theme/types";

const createHomeStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
      },
      title: {
        fontSize: 28,
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary,
      },
      categoriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
});

export default createHomeStyles;