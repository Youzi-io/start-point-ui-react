import { create } from "zustand";

export interface SpinState {
  globalSpin: boolean;
  getGlobalSpan: () => boolean;
  setGlobalSpan: (data: boolean) => void;
  globalDelay: number;
  globalTip: string;
  localSpin: boolean;
  getLocalSpan: () => boolean;
  setLocalSpan: (data: boolean) => void;
  localDelay: number;
  localTip: string;
}

const useSpinStore = create<SpinState>((set, get) => ({
  globalSpin: false,
  getGlobalSpan: () => get().globalSpin,
  setGlobalSpan: (data: boolean) => {
    set({ globalSpin: data });
  },
  globalDelay: 1000,
  globalTip: "加载中...",
  localSpin: false,
  getLocalSpan: () => get().localSpin,
  setLocalSpan: (data: boolean) => {
    set({ localSpin: data });
  },
  localDelay: 1000,
  localTip: "加载中...",
}));

export const setLocalSpan = useSpinStore.getState().setLocalSpan;

export default useSpinStore;
