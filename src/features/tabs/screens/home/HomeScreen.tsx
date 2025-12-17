import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../../../../components/banner/Banner';
import { HomeServiceList, HomeServiceListItem, RoundedCaurousel } from '../../../../components/list';
import HomeServiceListItemSkeleton from '../../../../components/list/HomeServiceListItemSkeleton';
import RoundedCaurouselItem from '../../../../components/list/RoundedCaurouselItem';
import RoundedCaurouselItemSkeleton from '../../../../components/list/RoundedCaurouselItemSkeleton';
import UserProfile from '../../../../components/user/UserProfile';
import { useTheme } from '../../../../theme/ThemeProvider';
import useHomeScreen from '../../hooks/home/useHomeScreen';
import { Category, Service } from '../../types';
import createHomeStyles from './HomeStyles';
const HomeScreen = () => {
  const { theme } = useTheme();

  const styles = useMemo(() => createHomeStyles(theme), [theme]);
  const { user, categories, keyExtractor, services, isLoadingCategories, isLoadingServices } = useHomeScreen();

  // Create skeleton data arrays
  const categorySkeletonData = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);
  const serviceSkeletonData = useMemo(() => Array.from({ length: 21 }, (_, i) => i), []);

  const renderItem = useCallback(
    ({ item }: { item: Category }) => <RoundedCaurouselItem category={item} />,
    []
  );
  
  const renderSkeletonItem = useCallback(
    ({ index }: { index: number }) => <RoundedCaurouselItemSkeleton index={index} />,
    []
  );

  const skeletonKeyExtractor = useCallback(
    (item: number) => `skeleton-category-${item}`,
    []
  );

  const renderServiceItem = useCallback(
    ({ item, index }: { item: Service, index: number }) => <HomeServiceListItem service={item} index={index} />,
    []
  );

  const renderServiceSkeletonItem = useCallback(
    ({ index }: { index: number }) => <HomeServiceListItemSkeleton index={index} />,
    []
  );

  const serviceSkeletonKeyExtractor = useCallback(
    (item: number) => `skeleton-service-${item}`,
    []
  );

  return (  
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <UserProfile user={user} /> 
        <Banner />
        <RoundedCaurousel 
          title="Categorias" 
          data={categories} 
          renderItem={renderItem}
          keyExtractor={keyExtractor} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          snapToInterval={100}
          decelerationRate="fast"
          pagingEnabled={false}
          loading={isLoadingCategories}
          skeletonData={categorySkeletonData}
          renderSkeletonItem={renderSkeletonItem}
          skeletonKeyExtractor={skeletonKeyExtractor}
        />
        <HomeServiceList
          title="Serviços"
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={keyExtractor}
          loading={isLoadingServices}
          skeletonData={serviceSkeletonData}
          renderSkeletonItem={renderServiceSkeletonItem}
          skeletonKeyExtractor={serviceSkeletonKeyExtractor}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen