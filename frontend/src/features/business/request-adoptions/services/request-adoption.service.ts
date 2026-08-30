import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { RequestAdoptionFilter } from "../dto/dashboard/request-adoption-filter";
import { Paginate } from "@/core/domain/models/system/paginate";
import { RequestAdoptionResponse } from "../dto/dashboard/request-adoption";
import { ReviewReqAdoptionDto } from "../dto/dashboard/review-req-adoption";
import { CreateRequestAdoptionDto } from "../dto/dashboard/create-request-adoption";
import { UpdateRequestAdoptionDto } from "../dto/dashboard/update-request-adoption";

export interface IRequestAdoptionService {
  create(createReq: CreateRequestAdoptionDto): Promise<void>;
  paginate(
    filter: RequestAdoptionFilter,
  ): Promise<Paginate<RequestAdoptionResponse>>;
}

class RequestAdoptionService implements IRequestAdoptionService {
  constructor(private readonly httpClient: HttpClient) {}

  async create(createReq: CreateRequestAdoptionDto): Promise<void> {
    return this.httpClient.post<void>(
      API_ENDPOINTS.REQUEST_ADOPTION.CREATE,
      createReq,
    );
  }

  async update(
    requestId: number,
    dto: UpdateRequestAdoptionDto,
  ): Promise<void> {
    return this.httpClient.put(
      API_ENDPOINTS.REQUEST_ADOPTION.UPDATE(requestId),
      dto,
    );
  }

  async paginate(
    filter: RequestAdoptionFilter,
  ): Promise<Paginate<RequestAdoptionResponse>> {
    return this.httpClient.get(API_ENDPOINTS.REQUEST_ADOPTION.PAGINATE, filter);
  }

  async delete(requestId: number): Promise<void> {
    return this.httpClient.delete(
      API_ENDPOINTS.REQUEST_ADOPTION.DELETE(requestId),
    );
  }

  async reviewAdoptionRequest(
    requestId: number,
    dto: ReviewReqAdoptionDto,
  ): Promise<void> {
    return this.httpClient.put<void>(
      API_ENDPOINTS.REQUEST_ADOPTION.REVIEW(requestId),
      dto,
    );
  }
}

export const requestAdoptionService = new RequestAdoptionService(httpClient);
