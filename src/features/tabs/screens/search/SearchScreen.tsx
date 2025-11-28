import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategorySection, SearchBar } from '../../../../components/search';
import { CategoryCardSkeleton } from '../../../../components/skeleton';
import { useTheme } from '../../../../theme';
import { useCategoriesQuery } from '../../../categories/hooks/useCategoriesQuery';
import { Category, Service } from '../../../categories/types';
import { createSearchStyles } from './SearchStyles';

const SearchScreen = () => {
  const { theme } = useTheme();
  const { data: categories, isLoading, error } = useCategoriesQuery();
  const styles = createSearchStyles(theme);

  const handleServicePress = useCallback((service: Service) => {
    // TODO: Navigate to service details
    console.log('Service pressed:', service.id);
  }, []);

  const handleSeeMorePress = useCallback((categoryId: string) => {
    // TODO: Navigate to category details or expand view
    console.log('See more pressed for category:', categoryId);
  }, []);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <CategorySection
        category={item}
        onServicePress={handleServicePress}
        onSeeMorePress={() => handleSeeMorePress(item.id)}
      />
    ),
    [handleServicePress, handleSeeMorePress]
  );

  const ListHeaderComponent = useCallback(
    () => <SearchBar />,
    []
  );

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <>
          <View style={styles.section}>
            <View style={styles.sectionTitleSkeleton} />
            <View style={styles.skeletonRow}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.skeletonCardContainer}>
                  <CategoryCardSkeleton columns={1} />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleSkeleton} />
            <View style={styles.skeletonRow}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.skeletonCardContainer}>
                  <CategoryCardSkeleton columns={1} />
                </View>
              ))}
            </View>
          </View>
        </>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Erro ao carregar categorias. Tente novamente.
          </Text>
        </View>
      );
    }

    return null;
  }, [isLoading, error, styles]);

  const categoriesData = useMemo(() => categories || [], [categories]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={categoriesData}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;