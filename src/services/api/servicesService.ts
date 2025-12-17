import { Service } from "../../features/tabs/types";
import { apiClient } from "./client";

export const servicesService = {
    getServices: async (): Promise<Service[]> => {
        const response = await apiClient.get('/services');
        return Array.isArray(response.data) ? response.data : [];
    }
}