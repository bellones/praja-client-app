import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { CategoriesItem } from '../../../../components/categories/CategoriesItem';
import CategoryItemSkeleton from '../../../../components/categories/CategoryItemSkeleton';
import SearchBar from '../../../../components/categories/SearchBar';
import { ListWithSkeleton } from '../../../../components/list';
import { Category } from '../../../../features/tabs/types';
import { useTheme } from '../../../../theme/ThemeProvider';
import useCategoriesQuery from '../../hooks/api/useCategoriesQuery';
import useSearchScreen from '../../hooks/categories/useSearchScreen';
import createSearchStyles from './SearchStyles';

const SearchScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createSearchStyles(theme), [theme]);
  const { form } = useSearchScreen();
  const { data: categories, isLoading } = useCategoriesQuery();

  const searchValue = form.watch('search');
  
  const handleSearchChange = useCallback(
    (text: string) => {
      form.setValue('search', text);
    },
    [form]
  );

  const categoriesData = useMemo(() => categories ?? [], [categories]);

  // Create skeleton data for loading state
  const skeletonData = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);

  const renderItem = useCallback(
    ({ item, index }: { item: Category, index: number }) => <CategoriesItem category={item} index={index} />,
    []
  );

  const renderSkeletonItem = useCallback(
    ({ index }: { index: number }) => <CategoryItemSkeleton index={index} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Category) => item.id ?? '',
    []
  );

  const skeletonKeyExtractor = useCallback(
    (item: number) => `skeleton-${item}`,
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
    <ListWithSkeleton
      loading={isLoading}
      data={categoriesData}
      skeletonData={skeletonData}
      renderItem={renderItem}
      renderSkeletonItem={renderSkeletonItem}
      keyExtractor={keyExtractor}
      skeletonKeyExtractor={skeletonKeyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      containerStyle={styles.container}
      contentContainerStyle={styles.listContainer}
      edges={['top', 'left', 'right']}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchScreen