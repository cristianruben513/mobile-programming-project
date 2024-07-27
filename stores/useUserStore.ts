import { create } from "zustand";

interface Data {
  id_user: number;
  id_student: number;
  name: string;
  email: string;
}

interface UserStore {
  data: Data;
  setData: (data: Data) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  data: {
    id_user: 0,
    id_student: 0,
    name: "",
    email: "",
  },
  setData: (data: Data) => set({ data }),
}));
