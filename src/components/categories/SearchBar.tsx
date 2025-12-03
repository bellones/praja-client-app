import React, { memo, useMemo } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SearchFormData } from "../../features/auth/schemas/searchSchema";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";
import { Input } from "../input/Input";

type SearchBarProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  control: Control<SearchFormData>;
  errors: FieldErrors<SearchFormData>;
}

const SearchBar = memo(({ value, onChangeText, control, errors, placeholder}: SearchBarProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createSearchBarStyles(theme), [theme]);
  
  const rightIcon = useMemo(
    () => <MagnifyingGlassIcon color={theme.colors.text} />,
    [theme.colors.text]
  );

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        value={value}
        control={control}
        name="search"
        onChangeText={onChangeText}
        error={errors.search?.message}
        rightIcon={rightIcon}
      />
    </View>
  );
});

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

