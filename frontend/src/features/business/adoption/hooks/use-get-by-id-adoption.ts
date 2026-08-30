import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { adoptionService } from "../services/adoption.service";

export default function useGetByIdAdoption() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: [QUERY_KEYS.BUSINESS.ADOPTION.ALL, id],
    queryFn: () => adoptionService.getById(Number(id || 0)),
    enabled: id !== undefined,
  });

  return {
    ...query,
    id,
  };
}
