import { create } from "zustand";

interface UserState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useUserStore = create<UserState>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: "" }),
}));

export default useUserStore;
