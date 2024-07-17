import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  token: string;
  getToken: () => string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: "",
      getToken: () => get().token,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const getToken = useUserStore.getState().getToken;
export const clearToken = useUserStore.getState().clearToken;

export default useUserStore;
