"use client";
import { create } from "zustand";

/**
 * Claves de filtro "apilables": el usuario va agregando valores del mismo
 * campo y se envían al backend unidos por "|" (OR). Si agregas más campos
 * apilables (status, categoryId, etc.), súmalos aquí también.
 */
export type StackableKey = "roleId" | "district";

export type UserFilterState = {
  page: number;
  pageSize: number;
  search: string;
  district: string[];
  roleId: string[];
  isBlocked: string;
  sort: string;
  toDashboard: string;
};

type UserFilterStore = UserFilterState & {
  updateFilter: (
    newFilter: Partial<Omit<UserFilterState, "roleId" | "district">>,
  ) => void;
  addStackedValue: (key: StackableKey, value: string) => void;
  removeStackedValue: (key: StackableKey, value: string) => void;
  toggleStackedValue: (key: StackableKey, value: string) => void;
  handleClear: () => void;
};

const DEFAULT_FILTER: UserFilterState = {
  page: 1,
  pageSize: 10,
  search: "",
  roleId: [],
  district: [],
  isBlocked: "",
  toDashboard: "",
  sort: "recommend",
};

export const useUserFilterStore = create<UserFilterStore>((set) => ({
  ...DEFAULT_FILTER,

  updateFilter: (newFilter) =>
    set((prev) => ({ ...prev, ...newFilter, page: 1 })),

  addStackedValue: (key, value) =>
    set((prev) => {
      if (prev[key].includes(value)) return prev;
      return { ...prev, [key]: [...prev[key], value], page: 1 };
    }),

  removeStackedValue: (key, value) =>
    set((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
      page: 1,
    })),

  toggleStackedValue: (key, value) =>
    set((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
        page: 1,
      };
    }),

  handleClear: () =>
    set((prev) => ({
      ...prev,
      search: "",
      roleId: [],
      isBlocked: "",
      page: 1,
      toDashboard: "",
      sort: "",
      district: [],
    })),
}));
