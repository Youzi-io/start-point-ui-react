import { create } from "zustand";

export interface SpinState {
  spin: boolean;
  getSpan: () => boolean;
  setSpin: (data: boolean) => void;
}

const useSpinStore = create<SpinState>((set, get) => ({
  spin: false,
  getSpan: () => get().spin,
  setSpin: (data: boolean) => {
    set({ spin: data });
  },
}));

export default useSpinStore;
