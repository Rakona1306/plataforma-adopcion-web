import HttpClient from "@/core/infrastructure/http/client";
import { httpClient } from "@/lib/httpClient";
import { RequestStatusResponse } from "../dtos/request-status-response";

interface IRequestStatusService {
    getAll(): Promise<RequestStatusResponse[]>;
}

class RequestStatusService implements IRequestStatusService {

    constructor(private httpClient: HttpClient) { }

    async getAll(): Promise<RequestStatusResponse[]> {
        return await this.httpClient.get("/enums/request-status");
    }
}

export const requestStatusService = new RequestStatusService(httpClient);
