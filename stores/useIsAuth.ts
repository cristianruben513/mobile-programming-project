import { create } from "zustand";

export interface Auth {
  isAuth: boolean;
}

interface AuthStore {
  auth: Auth;
  setAuth: (data: any) => void;
}

export const useIsAuth = create<AuthStore>((set) => ({
  auth: {
    isAuth: false,
  },
  setAuth: (auth: Auth) => set({ auth }),
}));
