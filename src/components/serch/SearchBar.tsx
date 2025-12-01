import { Control, FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SearchFormData } from "../../features/auth/schemas/searchSchema";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
import { Input } from "../input/Input";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  control: Control<SearchFormData>;
  errors: FieldErrors<SearchFormData>;
}

const SearchBar = ({ value, onChangeText, control,errors}: SearchBarProps) => {
  const { theme } = useTheme();
  const styles = createSearchBarStyles(theme);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Pesquisar"
        value={value}
        control={control}
        name="search"
        onChangeText={onChangeText}
        error={errors.search?.message}
        rightIcon={<MagnifyingGlassIcon color={theme.colors.text} />}
      />
    </View>
  )
}

const createSearchBarStyles = (tm: AppTheme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tm.colors.background,
    borderRadius: tm.radius.md,
    marginVertical: tm.spacing(4),
  },
});
export default SearchBar;

