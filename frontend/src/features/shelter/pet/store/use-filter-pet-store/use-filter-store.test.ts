import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

// Se asume que este archivo de test vive en el MISMO directorio que index.ts
// (el store), de modo que los especificadores de import coincidan con los
// que usa el propio store al mockear sus dependencias.

vi.mock("@/shared/constants/feature_filter", () => ({
  FEATURE_FILTER: {
    GENDER: { VALUE: "gender" },
    SPECIE: { VALUE: "specie" },
    SIZE: { VALUE: "size" },
    BREED: { VALUE: "breed" },
    AGE: { VALUE: "age", MIN_ID: "minAge", MAX_ID: "maxAge" },
  },
}));

vi.mock("@/store/use-filter-plp-store", () => ({
  useFilterPlpStore: {
    getState: vi.fn(),
  },
}));

import { useFilterPetStore } from "./index";
import { useFilterPlpStore } from "@/store/use-filter-plp-store";

const mockedGetState = useFilterPlpStore.getState as Mock;

const INITIAL_CONFIRMED_FILTERS = {
  gender: [],
  specieId: [],
  size: [],
  breedId: [],
  minAge: null,
  maxAge: null,
};

describe("useFilterPetStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reseteamos el store real entre tests para evitar fugas de estado
    useFilterPetStore.setState({
      confirmedFilters: INITIAL_CONFIRMED_FILTERS,
    });
    mockedGetState.mockReturnValue({ filters: [] });
  });

  it("inicia con confirmedFilters vacío por defecto", () => {
    expect(useFilterPetStore.getState().confirmedFilters).toEqual(
      INITIAL_CONFIRMED_FILTERS,
    );
  });

  it("confirmFilters agrupa correctamente los filtros por feature", () => {
    mockedGetState.mockReturnValue({
      filters: [
        { feature: "gender", name: "Macho", id: "male" },
        { feature: "gender", name: "Hembra", id: "female" },
        { feature: "specie", name: "Perro", id: "1" },
        { feature: "size", name: "Grande", id: "L" },
        { feature: "breed", name: "Labrador", id: "10" },
        { feature: "age", name: "minAge", id: "2" },
        { feature: "age", name: "maxAge", id: "10" },
      ],
    });

    useFilterPetStore.getState().confirmFilters();

    expect(useFilterPetStore.getState().confirmedFilters).toEqual({
      gender: ["male", "female"],
      specieId: ["1"],
      size: ["L"],
      breedId: ["10"],
      minAge: 2,
      maxAge: 10,
    });
  });

  it("deja minAge y maxAge en null cuando no vienen en los filtros actuales", () => {
    mockedGetState.mockReturnValue({
      filters: [{ feature: "gender", name: "Macho", id: "male" }],
    });

    useFilterPetStore.getState().confirmFilters();

    const { minAge, maxAge } = useFilterPetStore.getState().confirmedFilters;
    expect(minAge).toBeNull();
    expect(maxAge).toBeNull();
  });

  it("ignora entradas de filtros con un feature desconocido", () => {
    mockedGetState.mockReturnValue({
      filters: [
        { feature: "gender", name: "Macho", id: "male" },
        { feature: "unknown-feature", name: "N/A", id: "x" },
      ],
    });

    useFilterPetStore.getState().confirmFilters();

    expect(useFilterPetStore.getState().confirmedFilters).toEqual({
      ...INITIAL_CONFIRMED_FILTERS,
      gender: ["male"],
    });
  });

  it("parsea minAge/maxAge en base 10 (evita interpretación octal con ceros a la izquierda)", () => {
    mockedGetState.mockReturnValue({
      filters: [
        { feature: "age", name: "minAge", id: "08" },
        { feature: "age", name: "maxAge", id: "09" },
      ],
    });

    useFilterPetStore.getState().confirmFilters();

    const { minAge, maxAge } = useFilterPetStore.getState().confirmedFilters;
    expect(minAge).toBe(8);
    expect(maxAge).toBe(9);
  });

  it("resetConfirmedFilters vuelve al estado inicial tras haber confirmado filtros", () => {
    mockedGetState.mockReturnValue({
      filters: [{ feature: "gender", name: "Macho", id: "male" }],
    });
    useFilterPetStore.getState().confirmFilters();
    expect(useFilterPetStore.getState().confirmedFilters.gender).toEqual([
      "male",
    ]);

    useFilterPetStore.getState().resetConfirmedFilters();

    expect(useFilterPetStore.getState().confirmedFilters).toEqual(
      INITIAL_CONFIRMED_FILTERS,
    );
  });

  it("confirmFilters no muta el objeto confirmedFilters anterior (inmutabilidad)", () => {
    const before = useFilterPetStore.getState().confirmedFilters;
    mockedGetState.mockReturnValue({
      filters: [{ feature: "specie", name: "Gato", id: "2" }],
    });

    useFilterPetStore.getState().confirmFilters();
    const after = useFilterPetStore.getState().confirmedFilters;

    expect(after).not.toBe(before);
    expect(before).toEqual(INITIAL_CONFIRMED_FILTERS);
  });
});
