import { StyleSheet } from "react-native";
import { AppTheme } from "../../../../theme/types";

const createCategoriesStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(4),
  },
  content: {
  },
});

export default createCategoriesStyles;