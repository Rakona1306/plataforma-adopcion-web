import HttpClient from "@/core/infrastructure/http/client";

export const httpClient = new HttpClient({
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5036/api",
  TIMEOUT: 30000,
  RETRY_COUNT: 1,
});