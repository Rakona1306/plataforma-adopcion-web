import { useQuery } from "@tanstack/react-query";
import { noticeService } from "../services/volunter.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export default function useVolunteers() {
  return useQuery({
    queryKey: [QUERY_KEYS.BUSINESS.VOLUNTEER.PAGINATE],
    queryFn: async () => {
      const response = await noticeService.getAll();
      return response.items;
    },
  });
}
