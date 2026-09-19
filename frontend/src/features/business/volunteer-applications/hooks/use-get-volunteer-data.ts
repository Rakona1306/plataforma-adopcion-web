import { useQuery } from "@tanstack/react-query";
import { volunteerApplicationService } from "../services/volunter-applications.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export default function useGetVolunteerApplication() {
  return useQuery({
    queryKey: [QUERY_KEYS.BUSINESS.VOLUNTEER.PAGINATE],
    queryFn: async () => {
      const response = await volunteerApplicationService.getAll();
      return response.items;
    },
  });
}
