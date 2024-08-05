import { create } from "zustand";

export interface User {
  userId: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  userCreationDate: string;
  userRole: "Maestro" | "Estudiante" | "unknown";
  roleId: number | null;
}

interface UserStore {
  user: User;
  setUser: (data: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    userId: 0,
    userName: "",
    userPassword: "",
    userEmail: "",
    userCreationDate: "",
    userRole: "unknown",
    roleId: null,
  },
  setUser: (user: User) => set({ user }),
}));
