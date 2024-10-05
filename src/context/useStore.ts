import { create } from "zustand";

interface ScheduleState {
  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
  isToastOpen: boolean;
  setIsToastOpen: (isOpen: boolean) => void;
  isEventDetailOpen: boolean;
  setIsEventDetailOpen: (isOpen: boolean) => void;
  isRemoveModalOpen: boolean;
  setIsRemoveModalOpen: (isOpen: boolean) => void;
  isEditModal: boolean;
  setIsEditModal: (isOpen: boolean) => void;
  message: string;
  setMessage: (message: string) => void;
  messageType: "warning" | "checked";
  setMessageType: (messageType: "warning" | "checked") => void;
  toastUpdateCount: number;
  incrementToastUpdateCount: () => void;
}

export const useStore = create<ScheduleState>((set) => ({
  isEventModalOpen: false,
  setIsEventModalOpen: (isOpen) => set({ isEventModalOpen: isOpen }),
  isToastOpen: false,
  setIsToastOpen: (isOpen) => set({ isToastOpen: isOpen }),
  isEventDetailOpen: false,
  setIsEventDetailOpen: (isOpen) => set({ isEventDetailOpen: isOpen }),
  isRemoveModalOpen: false,
  setIsRemoveModalOpen: (isOpen) => set({ isRemoveModalOpen: isOpen }),
  isEditModal: false,
  setIsEditModal: (isOpen) => set({ isEditModal: isOpen }),
  message: "",
  setMessage: (message) => set({ message }),
  messageType: "warning",
  setMessageType: (messageType) => set({ messageType }),
  toastUpdateCount: 0,
  incrementToastUpdateCount: () =>
    set((state) => ({ toastUpdateCount: state.toastUpdateCount + 1 })),
}));
