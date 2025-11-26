import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { CategoryHeader, FilterButtons, RestaurantCard } from '../../../components/category';
import { AppStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { useCategoryQuery } from '../../categories/hooks/useCategoryQuery';
import { createCategoryDetailsStyles } from './CategoryDetailsStyles';

type CategoryDetailsRouteProp = RouteProp<AppStackParamList, 'CategoryDetails'>;

const CategoryDetailsScreen = () => {
  const { theme } = useTheme();
  const route = useRoute<CategoryDetailsRouteProp>();
  const { categoryId } = route.params;
  const { data: category, isLoading, error, refetch, isRefetching } = useCategoryQuery(categoryId);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
  const styles = createCategoryDetailsStyles(theme);

  const filterButtons = [
    { id: 'sort', label: 'Ordenar', onPress: () => setSelectedFilter('sort') },
    { id: 'distance', label: 'Distância', onPress: () => setSelectedFilter('distance') },
    { id: 'category', label: category?.name || '', onPress: () => setSelectedFilter('category') },
    { id: 'fast', label: 'Entrega Rápida', onPress: () => setSelectedFilter('fast') },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro ao carregar categoria. Tente novamente.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryHeader category={category} />
      <FilterButtons filters={filterButtons} selectedFilter={selectedFilter} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
          />
        }
      >
        {category.restaurants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum restaurante encontrado</Text>
          </View>
        ) : (
          category.restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => {
                // Navigate to restaurant details - placeholder
                console.log('Restaurant pressed:', restaurant.id);
              }}
              onFavoritePress={() => {
                // Toggle favorite - placeholder
                console.log('Favorite toggled:', restaurant.id);
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryDetailsScreen;

