import { create } from "zustand";

type TimelineStore = {
  isOpen: boolean;
  data: string;

  onOpen: (data: string) => void;
  onClose: () => void;

  succeedFunction: (data: string) => void;
  setSucceedFunction: (func: (data: string) => void) => void;
};

export const useTimelineBlock = create<TimelineStore>((set, get) => ({
  isOpen: false,
  data: "",
  onOpen: (data) => set({ isOpen: true, data: data }),
  onClose: () => set({ isOpen: false }),
  succeedFunction: (data) => {},
  setSucceedFunction: (func) => set({ succeedFunction: func })
}));