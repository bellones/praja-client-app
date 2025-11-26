import { AxiosError } from 'axios';
import { Category, CategoryDetailsResponse, CategoryListResponse } from '../../features/categories/types';
import { ApiError } from './authService';
import { apiClient } from './client';

/**
 * Category service for fetching categories and category details
 */
export const categoryService = {
  /**
   * Get all categories
   * @returns Promise with list of categories
   * @throws ApiError with detailed error information
   */
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<Category[]>('/categories');
      
      // API returns array of categories with Service array inside
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      
      // Handle network errors
      if (!axiosError.response) {
        throw {
          message: 'Erro de conexão. Verifique sua internet.',
          status: 0,
        } as ApiError;
      }

      const status = axiosError.response.status;
      const errorData = axiosError.response.data;

      // Handle specific HTTP status codes
      switch (status) {
        case 500:
          throw {
            message: 'Erro no servidor. Tente novamente mais tarde.',
            status: 500,
            data: errorData,
          } as ApiError;

        default:
          const genericMessage = errorData?.message || errorData?.error || 'Ocorreu um erro. Tente novamente.';
          throw {
            message: genericMessage,
            status,
            data: errorData,
          } as ApiError;
      }
    }
  },

  /**
   * Get category details by ID
   * @param id - Category ID
   * @returns Promise with category details including restaurants
   * @throws ApiError with detailed error information
   */
  getCategoryById: async (id: string): Promise<CategoryDetailsResponse> => {
    try {
      const response = await apiClient.get<CategoryDetailsResponse>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      
      // Handle network errors
      if (!axiosError.response) {
        throw {
          message: 'Erro de conexão. Verifique sua internet.',
          status: 0,
        } as ApiError;
      }

      const status = axiosError.response.status;
      const errorData = axiosError.response.data;

      // Handle specific HTTP status codes
      switch (status) {
        case 404:
          throw {
            message: 'Categoria não encontrada.',
            status: 404,
            data: errorData,
          } as ApiError;

        case 500:
          throw {
            message: 'Erro no servidor. Tente novamente mais tarde.',
            status: 500,
            data: errorData,
          } as ApiError;

        default:
          const genericMessage = errorData?.message || errorData?.error || 'Ocorreu um erro. Tente novamente.';
          throw {
            message: genericMessage,
            status,
            data: errorData,
          } as ApiError;
      }
    }
  },
};




