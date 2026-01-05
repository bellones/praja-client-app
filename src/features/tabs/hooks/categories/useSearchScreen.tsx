import { useCallback, useMemo } from "react";
import { CategoriesItem } from "../../../../components/categories/CategoriesItem";
import CategoryItemSkeleton from "../../../../components/categories/CategoryItemSkeleton";
import SearchHeader from "../../../../components/categories/SearchHeader";
import { useForm } from "../../../auth/hooks/form/useForm";
import { searchSchema } from "../../../auth/schemas/searchSchema";
import { Category } from "../../types";
import useCategoriesQuery from "../api/useCategoriesQuery";

const useSearchScreen = () => {
    const form = useForm<typeof searchSchema>({
        schema: searchSchema,
        defaultValues: {
            search: '',
        },
        mode: 'onChange',
    });

    const { data: categories, isLoading } = useCategoriesQuery();
    const searchValue = form.watch('search');

    const handleSearchChange = useCallback(
        (text: string) => {
            form.setValue('search', text);
        },
        [form]
    );

    // Filter categories and services based on search value
    const filteredCategoriesData = useMemo(() => {
        const allCategories = categories ?? [];
        const searchTerm = searchValue?.toLowerCase().trim() || '';

        if (!searchTerm) {
            return allCategories;
        }

        return allCategories
            .map((category) => {
                // Check if category name matches
                const categoryNameMatches = category?.name?.toLowerCase().includes(searchTerm) ?? false;

                // If category name matches, show all services
                if (categoryNameMatches) {
                    return category;
                }

                // Otherwise, filter services within the category
                const filteredServices = (category?.Service ?? []).filter((service) => {
                    const serviceNameMatches = service?.name?.toLowerCase().includes(searchTerm) ?? false;
                    const serviceDescriptionMatches = service?.description?.toLowerCase().includes(searchTerm) ?? false;
                    return serviceNameMatches || serviceDescriptionMatches;
                });

                // Include category only if it has matching services
                if (filteredServices.length > 0) {
                    return {
                        ...category,
                        Service: filteredServices,
                    } as Category;
                }

                return null;
            })
            .filter((category): category is Category => category !== null);
    }, [categories, searchValue]);

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

    // Use stable component reference - memoize the header element
    const ListHeaderComponent = useMemo(
        () => (
            <SearchHeader
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                control={form.control}
                errors={form.formState.errors}
            />
        ),
        [searchValue, handleSearchChange, form.control, form.formState.errors]
    );

    return {
        form,
        searchValue,
        handleSearchChange,
        filteredCategoriesData,
        isLoading,
        skeletonData,
        renderItem,
        renderSkeletonItem,
        keyExtractor,
        skeletonKeyExtractor,
        ListHeaderComponent,
    };
};

export default useSearchScreen;