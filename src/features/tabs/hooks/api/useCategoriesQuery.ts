import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../../../../services/api/categororiesService";

const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesService.getCategories(),
    });
}

export default useCategoriesQuery;