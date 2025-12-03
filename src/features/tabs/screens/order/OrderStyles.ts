import { StyleSheet } from "react-native";
import { AppTheme } from "../../../../theme/types";

const createOrderStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing(4),
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary,
    },
});

export default createOrderStyles;