import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../../../../components/banner/Banner';
import { HomeServiceList, RandomCategoriesList, RoundedCaurousel } from '../../../../components/list';
import UserProfile from '../../../../components/user/UserProfile';
import { useTheme } from '../../../../theme/ThemeProvider';
import useHomeScreen from '../../hooks/home/useHomeScreen';
import createHomeStyles from './HomeStyles';

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createHomeStyles(theme), [theme]);
  const {
    user,
    categories,
    keyExtractor,
    services,
    randomCategories,
    isLoadingCategories,
    isLoadingServices,
    categorySkeletonData,
    randomCategorySkeletonData,
    serviceSkeletonData,
    randomCategoriesListStyle,
    renderItem,
    renderSkeletonItem,
    skeletonKeyExtractor,
    renderServiceItem,
    renderServiceSkeletonItem,
    serviceSkeletonKeyExtractor,
    renderCategoryItem,
    renderCategorySkeletonItem,
    categoryKeyExtractor,
    categorySkeletonKeyExtractor,
  } = useHomeScreen();

  return (  
    <ScrollView showsVerticalScrollIndicator={false}>
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
        <RandomCategoriesList
          data={randomCategories}
          renderItem={renderCategoryItem}
          keyExtractor={categoryKeyExtractor}
          loading={isLoadingCategories}
          skeletonData={randomCategorySkeletonData}
          renderSkeletonItem={renderCategorySkeletonItem}
          skeletonKeyExtractor={categorySkeletonKeyExtractor}
          contentContainerStyle={randomCategoriesListStyle}
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