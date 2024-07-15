import { create } from "zustand";

interface TagData {
  path: string;
  title: string;
  componentName: string;
  keepAlive: string;
}

interface TagState {
  tagList: TagData[];
  getTagList: () => TagData[];
  cacheView: string[];
  addTag: (tagData: TagData) => void;
  closeTag: (index: number) => void;
  closeOtherTags: (index: number) => void;
  closeAllTags: () => void;
}

const useTagStore = create<TagState>((set, get) => ({
  tagList: [
    {
      path: "/home/index",
      title: "home1",
      keepAlive: "1",
      componentName: "123",
    },
    {
      path: "/home/index",
      title: "home21111111",
      keepAlive: "1",
      componentName: "123",
    },
    {
      path: "/home/index",
      title: "home3",
      keepAlive: "1",
      componentName: "123",
    },
  ],
  getTagList: () => get().tagList,
  cacheView: [],
  addTag: (tagData: TagData) =>
    set((state) => {
      return {
        tagList: [...state.tagList, tagData],
      };
    }),
  closeTag: (index) =>
    set((state) => {
      return {
        tagList: state.tagList.filter((_item, i) => index !== i),
      };
    }),
  closeOtherTags: (index) =>
    set((state) => {
      return {
        tagList: state.tagList.filter((_item, i) => index === i),
      };
    }),
  closeAllTags: () =>
    set(() => {
      return {
        tagList: [],
      };
    }),
}));

export default useTagStore;
