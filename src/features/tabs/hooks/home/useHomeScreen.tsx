import { useCallback, useMemo } from "react";
import { CategoriesItem } from "../../../../components/categories/CategoriesItem";
import CategoryItemSkeleton from "../../../../components/categories/CategoryItemSkeleton";
import HomeServiceListItem from "../../../../components/list/HomeServiceListItem";
import HomeServiceListItemSkeleton from "../../../../components/list/HomeServiceListItemSkeleton";
import RoundedCaurouselItem from "../../../../components/list/RoundedCaurouselItem";
import RoundedCaurouselItemSkeleton from "../../../../components/list/RoundedCaurouselItemSkeleton";
import { useAuthStore } from "../../../../state";
import { useTheme } from "../../../../theme/ThemeProvider";
import { Category, Service } from "../../types";
import useCategoriesQuery from "../api/useCategoriesQuery";
import useServicesQuery from "../api/useServicesQuery";

const useHomeScreen = () => {
    const { theme } = useTheme();
    const user = useAuthStore((state) => state.user);
    const { data: categories, isLoading: isLoadingCategories } = useCategoriesQuery();
    const { data: services, isLoading: isLoadingServices } = useServicesQuery();
    const categoriesData = useMemo(() => categories ?? [], [categories]);
    
    // Select 3 random categories
    const randomCategories = useMemo(() => {
        if (categoriesData.length === 0) return [];
        const shuffled = [...categoriesData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [categoriesData]);
    
    // Select 12 random services
    const servicesData = useMemo(() => {
        if (!services || services.length === 0) return [];
        const shuffled = [...services].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 12);
    }, [services]);
    
    // Create skeleton data arrays
    const categorySkeletonData = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);
    const randomCategorySkeletonData = useMemo(() => Array.from({ length: 3 }, (_, i) => i), []);
    const serviceSkeletonData = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

    // Style for random categories list container
    const randomCategoriesListStyle = useMemo(() => ({
        paddingBottom: theme.spacing(2),
        gap: theme.spacing(2),
    }), [theme]);

    const keyExtractor = useCallback(
      (item: Category) => item.id ?? '',
      []
    );

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

    // Render functions for random categories (same format as search screen)
    const renderCategoryItem = useCallback(
      ({ item, index }: { item: Category, index: number }) => <CategoriesItem category={item} index={index} />,
      []
    );

    const renderCategorySkeletonItem = useCallback(
      ({ index }: { index: number }) => <CategoryItemSkeleton index={index} />,
      []
    );

    const categoryKeyExtractor = useCallback(
      (item: Category) => item.id ?? '',
      []
    );

    const categorySkeletonKeyExtractor = useCallback(
      (item: number) => `skeleton-category-${item}`,
      []
    );

    return {
        categories: categoriesData,
        services: servicesData,
        randomCategories,
        keyExtractor,
        user,
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
    }
   
}

export default useHomeScreen;
