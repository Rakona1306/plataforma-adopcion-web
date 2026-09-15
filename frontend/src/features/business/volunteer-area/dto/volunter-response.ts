import { volunteerResponse } from "./update-volunter";

export interface VolunteerPaginationResponse {
  items: volunteerResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
