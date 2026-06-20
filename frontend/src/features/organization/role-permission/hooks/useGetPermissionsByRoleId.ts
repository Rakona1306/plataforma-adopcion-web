import { QUERYKEYS } from "@/shared/constants/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { rolePermissionService } from "../services/role-permission.service"
import { useRouter } from "next/navigation"

export default function useGetPermissionsByRoleId(roleId: string) {

    const router = useRouter();

    const query = useQuery({
        queryKey: [QUERYKEYS.SHELTER.ROLE_PERMISSION, roleId],
        queryFn: () => rolePermissionService.getPermissionsByRoleId(roleId),
        placeholderData: (previousData) => previousData,
        throwOnError: (error: any) => {
            if (
                error?.response?.status === 401 ||
                error?.status === 401
            ) {
                router.push("/login");
                return false;
            }

            return true;
        },
    })

    return {
        rolePermissions: query.data,
        ...query
    }
}