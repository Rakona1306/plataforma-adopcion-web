import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

// IMPORTANTE: los paths de los mocks deben coincidir EXACTAMENTE con los
// especificadores de import usados dentro de use-get-paginate-search.ts,
// ya que vi.mock() reemplaza el módulo por especificador, no por ruta
// resuelta. Se asume que este archivo de test vive en el MISMO directorio
// que el hook (junto a use-get-paginate-search.ts).

vi.mock("../services/pet-pub.service", () => ({
  petPubService: {
    getPaginateSearch: vi.fn(),
  },
}));

vi.mock("../store/use-filter-pet-store", () => ({
  useFilterPetStore: vi.fn(),
}));

import { useGetPaginateSearch } from "./use-get-paginate-search";
import { petPubService } from "../services/pet-pub.service";
import { useFilterPetStore } from "../store/use-filter-pet-store";

const mockedGetPaginateSearch = petPubService.getPaginateSearch as Mock;
const mockedUseFilterPetStore = useFilterPetStore as unknown as Mock;

const DEFAULT_CONFIRMED_FILTERS = {
  gender: [],
  specieId: [],
  size: [],
  breedId: [],
  minAge: null,
  maxAge: null,
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useGetPaginateSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseFilterPetStore.mockReturnValue({
      confirmedFilters: DEFAULT_CONFIRMED_FILTERS,
    });
    mockedGetPaginateSearch.mockResolvedValue({
      items: [],
      totalCount: 0,
      totalPages: 0,
      page: 1,
    });
  });

  it("inicializa con los valores por defecto del filtro", () => {
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    expect(result.current.filter).toEqual({
      page: 1,
      sort: "",
      pageSize: 20,
      search: "",
    });
    expect(result.current.isSearchActive).toBe(false);
  });

  it("setSearch actualiza el término de búsqueda y reinicia la página a 1", () => {
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setPage(4);
    });
    expect(result.current.filter.page).toBe(4);

    act(() => {
      result.current.setSearch("labrador");
    });

    expect(result.current.filter.search).toBe("labrador");
    expect(result.current.filter.page).toBe(1);
  });

  it("setPage actualiza únicamente la página, sin tocar otros campos del filtro", () => {
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearch("gato");
    });
    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.filter).toEqual({
      page: 3,
      sort: "",
      pageSize: 20,
      search: "gato",
    });
  });

  it("updateFilter mezcla parcialmente el filtro existente sin perder el resto", () => {
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateFilter({ sort: "name_asc" });
    });

    expect(result.current.filter).toEqual({
      page: 1,
      sort: "name_asc",
      pageSize: 20,
      search: "",
    });
  });

  it("isSearchActive es true solo cuando el término alcanza SEARCH_MIN_CHARS (3)", () => {
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearch("la");
    });
    expect(result.current.isSearchActive).toBe(false);

    act(() => {
      result.current.setSearch("lab");
    });
    expect(result.current.isSearchActive).toBe(true);
  });

  it("llama a petPubService.getPaginateSearch con el filtro actual y los filtros confirmados", async () => {
    const confirmedFilters = {
      ...DEFAULT_CONFIRMED_FILTERS,
      gender: ["male"],
    };
    mockedUseFilterPetStore.mockReturnValue({ confirmedFilters });

    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearch("rex");
    });

    await waitFor(() => {
      expect(mockedGetPaginateSearch).toHaveBeenCalled();
    });

    const lastCallArgs =
      mockedGetPaginateSearch.mock.calls[
        mockedGetPaginateSearch.mock.calls.length - 1
      ];
    expect(lastCallArgs[0]).toMatchObject({ search: "rex", page: 1 });
    expect(lastCallArgs[1]).toEqual(confirmedFilters);
  });

  it("isSearchPending termina en false una vez que el valor diferido alcanza al valor inmediato", async () => {
    // Nota: useDeferredValue puede resolverse de forma prácticamente
    // síncrona en el entorno de test (jsdom + act), por lo que no se
    // afirma el estado transitorio "true"; solo se verifica el estado
    // final consistente tras la actualización.
    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearch("beagle");
    });

    await waitFor(() => {
      expect(result.current.isSearchPending).toBe(false);
    });
  });

  it("expone los datos, isLoading e isError provenientes de react-query", async () => {
    mockedGetPaginateSearch.mockResolvedValueOnce({
      items: [{ id: "1" }],
      totalCount: 1,
      totalPages: 1,
      page: 1,
    });

    const { result } = renderHook(() => useGetPaginateSearch(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual({
      items: [{ id: "1" }],
      totalCount: 1,
      totalPages: 1,
      page: 1,
    });
  });
});
