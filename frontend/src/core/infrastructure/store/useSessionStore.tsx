import { UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";
import { create } from "zustand";


interface SessionStore {
  user: UserLogged | null;

  setUser: (
    user: UserLogged | null
  ) => void;

  clearSession: () => void;
}

export const useSessionStore =
  create<SessionStore>((set) => ({
    user: null,

    setUser: (user) =>
      set({ user }),

    clearSession: () =>
      set({
        user: null,
      }),
  }));