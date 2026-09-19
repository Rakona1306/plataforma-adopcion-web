import { waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useGetVolunteerApplication from "./use-get-volunteer-data";
import { volunteerApplicationService } from "../services/volunter-applications.service";
import { mockApplications } from "@/__mocks__/volunteer.mock";
import { renderHook } from "@/test/test-utils";

vi.mock("../services/volunter-applications.service", () => ({
  volunteerApplicationService: {
    getAll: vi.fn(),
  },
}));

const mockedService = vi.mocked(volunteerApplicationService);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetVolunteerApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería obtener y retornar las aplicaciones de voluntariado", async () => {
    mockedService.getAll.mockResolvedValue({
      items: mockApplications,
      totalCount: mockApplications.length,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });

    const { result } = renderHook(() => useGetVolunteerApplication(), {
      wrapper: createWrapper(),
    });

    // Inicialmente está cargando
    expect(result.current.isLoading).toBe(true);

    // Esperamos a que termine de cargar
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockApplications);
    expect(mockedService.getAll).toHaveBeenCalledTimes(1);
  });
});
