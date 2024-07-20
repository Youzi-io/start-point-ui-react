import { RoutesInfoRes } from "@/types/system/routes";
import { create } from "zustand";

interface RoutesState {
  whiteList: string[];
  menuRouters: RoutesInfoRes[];
  setMenuRouters: (menuRouters: RoutesInfoRes[]) => void;
  isAddRoutes: boolean;
  setIsAddRoutes: (isAddRoutes: boolean) => void;
}

const useRoutesStore = create<RoutesState>((set) => ({
  whiteList: ["/login"],
  menuRouters: [],
  setMenuRouters: (menuRouters) => set({ menuRouters }),
  isAddRoutes: false,
  setIsAddRoutes: (isAddRoutes) => set({ isAddRoutes }),
}));

export default useRoutesStore;
