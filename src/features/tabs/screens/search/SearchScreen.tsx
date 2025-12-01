import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../../components/serch/SearchBar';
import { useTheme } from '../../../../theme/ThemeProvider';
import useSearch from '../../hooks/search/useSearch';
import createSearchStyles from './SearchStyles';

const SearchScreen = () => {
  const { theme } = useTheme();
  const styles = createSearchStyles(theme);
  const { form } = useSearch();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <SearchBar 
        value={form.watch('search')}
        onChangeText={(text) => form.setValue('search', text)}
        control={form.control}
        errors={form.formState.errors}
        
      />
    </SafeAreaView>
  )
}

export default SearchScreen