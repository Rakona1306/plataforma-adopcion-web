import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import HttpClient from "@/core/infrastructure/http/client";
import { Paginate } from "@/core/domain/models/system/paginate";
import { VolunteerApplicationResponse } from "../dto/volunter-application-response";
export interface IVolunteerApplicationService {
  getById: (id: number) => Promise<VolunteerApplicationResponse>;
  getAll: () => Promise<Paginate<VolunteerApplicationResponse>>;
}
class VolunteerApplicationService implements IVolunteerApplicationService {
  constructor(private readonly httpClient: HttpClient) {}
  async getById(id: number): Promise<VolunteerApplicationResponse> {
    return this.httpClient.get(
      API_ENDPOINTS.VOLUNTEER_APPLICATIONS.GET_BY_ID(id),
    );
  }

  async getAll(): Promise<Paginate<VolunteerApplicationResponse>> {
    return this.httpClient.get(
      API_ENDPOINTS.VOLUNTEER_APPLICATIONS.PUBLIC_LIST,
    );
  }
}

export const volunteerApplicationService = new VolunteerApplicationService(
  httpClient,
);
