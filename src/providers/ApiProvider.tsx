import React from 'react';
import { apiClient } from '../services/api/client';

interface ApiProviderProps {
  children: React.ReactNode;
}

/**
 * ApiProvider initializes and configures the axios instance.
 * This ensures axios is properly configured before any API calls are made.
 * Future: Can be used to inject auth tokens via interceptors.
 */
export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // Initialize axios configuration
  // The apiClient is already configured in client.ts
  // This provider ensures the configuration is available when the app starts

  // Future: Add token injection interceptor here
  // apiClient.interceptors.request.use((config) => {
  //   const token = useAuthStore.getState().accessToken;
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  return <>{children}</>;
};

