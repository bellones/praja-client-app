import { Category } from "../../features/tabs/types";
import { apiClient } from "./client";

export const categoriesService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories');
    return Array.isArray(response.data) ? response.data : [];
  }
}