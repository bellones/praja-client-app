import { AxiosError } from 'axios';
import { Session } from '../../state/types';
import { apiClient } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

/**
 * Authentication service for login operations
 */
export const authService = {
  /**
   * Login user with email and password
   * @param credentials - User email and password
   * @returns Promise with session data (access_token and user)
   * @throws ApiError with detailed error information
   */
  login: async (credentials: LoginRequest): Promise<Session> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Transform API response to Session format
      return {
        access_token: response.data.access_token,
        user: response.data.user,
      };
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
            message: 'Email ou senha inválidos.',
            status: 401,
            data: errorData,
          } as ApiError;

        case 400:
          // Try to extract error message from response
          const errorMessage = errorData?.message || errorData?.error || 'Dados inválidos. Verifique os campos.';
          throw {
            message: errorMessage,
            status: 400,
            data: errorData,
          } as ApiError;

        case 500:
          throw {
            message: 'Erro no servidor. Tente novamente mais tarde.',
            status: 500,
            data: errorData,
          } as ApiError;

        default:
          // Generic error message
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

