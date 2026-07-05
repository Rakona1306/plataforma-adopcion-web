import { useQuery } from "@tanstack/react-query";
import { requestStatusService } from "../services/request-status.service";

export default function useGetRequestStatus() {
    return useQuery({
        queryKey: ['request-status'],
        queryFn: async () => {
            const response = await requestStatusService.getAll();
            return response;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });


}