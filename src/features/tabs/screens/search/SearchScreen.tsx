import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoriesItem } from '../../../../components/categories/CategoriesItem';
import SearchBar from '../../../../components/categories/SearchBar';
import { Category } from '../../../../features/tabs/types';
import { useTheme } from '../../../../theme/ThemeProvider';
import useCategoriesQuery from '../../hooks/api/useCategoriesQuery';
import useSearchScreen from '../../hooks/categories/useSearchScreen';
import createSearchStyles from './SearchStyles';

const SearchScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createSearchStyles(theme), [theme]);
  const { form } = useSearchScreen();
  const { data: categories } = useCategoriesQuery();

  const searchValue = form.watch('search');
  
  const handleSearchChange = useCallback(
    (text: string) => {
      form.setValue('search', text);
    },
    [form]
  );

  const categoriesData = useMemo(() => categories ?? [], [categories]);

  const renderItem = useCallback(
    ({ item }: { item: Category }) => <CategoriesItem category={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Category) => item.id ?? '',
    []
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Categorias</Text>
        <SearchBar 
          value={searchValue}
          onChangeText={handleSearchChange}
          control={form.control}
          errors={form.formState.errors}
          placeholder="Buscar por Serviços"
        />
      </View>
    ),
    [searchValue, handleSearchChange, form.control, form.formState.errors, styles]
  );

  return (
    <SafeAreaView style={styles.container} edges={[ 'top', 'left', 'right']}>
      <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default SearchScreen