import { create } from "zustand";

export interface SpinState {
  spin: boolean;
  getSpan: () => boolean;
  setSpin: (data: boolean) => void;
  delay: number;
  tip: string;
}

const useSpinStore = create<SpinState>((set, get) => ({
  spin: false,
  getSpan: () => get().spin,
  setSpin: (data: boolean) => {
    set({ spin: data });
  },
  delay: 1000,
  tip: "加载中...",
}));

export default useSpinStore;
