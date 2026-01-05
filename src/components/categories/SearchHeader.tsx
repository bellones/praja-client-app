import React, { memo } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Text, View, StyleSheet } from 'react-native';
import { SearchFormData } from '../../features/auth/schemas/searchSchema';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';
import SearchBar from './SearchBar';

type SearchHeaderProps = {
  searchValue: string;
  onSearchChange: (text: string) => void;
  control: Control<SearchFormData>;
  errors: FieldErrors<SearchFormData>;
}

const SearchHeader = memo<SearchHeaderProps>(({ searchValue, onSearchChange, control, errors }) => {
  const { theme } = useTheme();
  const styles = createSearchHeaderStyles(theme);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Categorias</Text>
      <SearchBar 
        value={searchValue}
        onChangeText={onSearchChange}
        control={control}
        errors={errors}
        placeholder="Buscar por Serviços"
      />
    </View>
  );
});

const createSearchHeaderStyles = (theme: AppTheme) => StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing(4),
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
    marginBottom: theme.spacing(2),
  },
});

export default SearchHeader;

