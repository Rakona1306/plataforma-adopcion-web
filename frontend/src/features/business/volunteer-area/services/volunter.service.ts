import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { volunteerResponse } from "../dto/update-volunter";
import { VolunteerPaginationResponse } from "../dto/volunter-response";
import HttpClient from "@/core/infrastructure/http/client";
export interface INoticeService {
  getById: (id: number) => Promise<volunteerResponse>;
  getAll: () => Promise<VolunteerPaginationResponse>;
}
class NoticeService implements INoticeService {
  constructor(private readonly httpClient: HttpClient) {}
  async getById(id: number): Promise<volunteerResponse> {
    return this.httpClient.get(
      API_ENDPOINTS.VOLUNTEER_APPLICATIONS.GET_BY_ID(id),
    );
  }

  async getAll(): Promise<VolunteerPaginationResponse> {
    return this.httpClient.get(API_ENDPOINTS.VOLUNTEER_APPLICATIONS.LIST);
  }
}

export const noticeService = new NoticeService(httpClient);
