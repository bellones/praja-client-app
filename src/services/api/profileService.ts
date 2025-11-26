import { AxiosError } from 'axios';
import { ProfileResponse } from '../../features/profile/types';
import { ApiError } from './authService';
import { apiClient } from './client';

/**
 * Profile service for fetching user profile data
 */
export const profileService = {
  /**
   * Get user profile
   * @returns Promise with user profile data
   * @throws ApiError with detailed error information
   */
  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await apiClient.get<ProfileResponse>('/auth/profile');
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
        case 401:
          throw {
            message: 'Não autorizado. Faça login novamente.',
            status: 401,
            data: errorData,
          } as ApiError;

        case 404:
          throw {
            message: 'Perfil não encontrado.',
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




