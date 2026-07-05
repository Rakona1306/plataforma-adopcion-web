import { RequestStatusResponse } from "@/features/system/enums/request-status/dtos/request-status-response";

export const renderIntStatus = (status: string, requestStatus: RequestStatusResponse[] | undefined): number => {
    const statusObj = requestStatus?.find((s) => s.value === status);
    return statusObj ? statusObj.key : 0;
}