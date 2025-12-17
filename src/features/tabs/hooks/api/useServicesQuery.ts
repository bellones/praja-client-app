import { useQuery } from "@tanstack/react-query";
import { servicesService } from "../../../../services/api/servicesService";

const useServicesQuery = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: () => servicesService.getServices(),
        enabled: true,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        retryDelay: 1000,
    });
}

export default useServicesQuery;