import { useCallback, useMemo } from "react";
import { useAuthStore } from "../../../../state";
import { Category } from "../../types";
import useCategoriesQuery from "../api/useCategoriesQuery";
import useServicesQuery from "../api/useServicesQuery";

const useHomeScreen = () => {

    const user = useAuthStore((state) => state.user);
    const { data: categories, isLoading: isLoadingCategories } = useCategoriesQuery();
    const { data: services, isLoading: isLoadingServices } = useServicesQuery();
    const categoriesData = useMemo(() => categories ?? [], [categories]);
    const servicesData = useMemo(() => (services ?? []).slice(0, 21), [services]);
    const keyExtractor = useCallback(
      (item: Category) => item.id ?? '',
      []
    );


    return {
        categories: categoriesData,
        services: servicesData,
        keyExtractor,
        user,
        isLoadingCategories,
        isLoadingServices,
    }
   
}

export default useHomeScreen;
