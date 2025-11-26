import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../../services/api/categoryService';
import { Category } from '../types';

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};




