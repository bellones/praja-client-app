import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../../services/api/categoryService';
import { CategoryDetails } from '../types';

export const useCategoryQuery = (categoryId: string) => {
  return useQuery<CategoryDetails>({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await categoryService.getCategoryById(categoryId);
      return response as CategoryDetails;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};




