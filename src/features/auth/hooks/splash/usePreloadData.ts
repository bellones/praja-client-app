import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { categoryService } from '../../../../services/api/categoryService';

/**
 * Hook to preload essential data when user is logged in
 * This should be called in the splash screen to avoid loading states in main screens
 */
export const usePreloadData = () => {
  const queryClient = useQueryClient();
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadError, setPreloadError] = useState<Error | null>(null);

  const preloadCategories = useCallback(async () => {
    try {
      setIsPreloading(true);
      setPreloadError(null);

      // Prefetch categories data
      // This will populate the React Query cache
      await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.getCategories(),
        staleTime: 10 * 60 * 1000, // 10 minutes
      });
    } catch (error) {
      console.error('Error preloading categories:', error);
      setPreloadError(error as Error);
    } finally {
      setIsPreloading(false);
    }
  }, [queryClient]);

  return {
    preloadCategories,
    isPreloading,
    preloadError,
  };
};

