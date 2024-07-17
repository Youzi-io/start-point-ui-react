import { create } from "zustand";

interface UserState {
  token: string;
  getToken: () => string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useUserStore = create<UserState>((set, get) => ({
  token: "",
  getToken: () => get().token,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: "" }),
}));

export default useUserStore;
