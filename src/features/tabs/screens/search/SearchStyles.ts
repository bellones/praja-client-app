import { StyleSheet } from "react-native";
import { AppTheme } from "../../../../theme/types";

const createSearchStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    paddingHorizontal: theme.spacing(4),
  },
  listContainer: {
    paddingBottom: theme.spacing(0),
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
    marginBottom: theme.spacing(2),
  },
});

export default createSearchStyles;