import { UIState } from "@/types/types";
import { create } from "zustand";

export const useUIStateStore = create<UIState>((set) => ({
  isEventModalOpen: false,
  isToastOpen: false,
  isEventDetailOpen: false,
  isRemoveModalOpen: false,
  isEditModal: false,
  message: "",
  messageType: "warning",
  toastUpdateCount: 0,
  isTodoModalOpen: false,
  isTodoTimeModalOpen: false,
  date: undefined,
  isAllday: true,
  isEditingTodo: false,
  setIsEventModalOpen: (isOpen) => set({ isEventModalOpen: isOpen }),
  setIsToastOpen: (isOpen) => set({ isToastOpen: isOpen }),
  setIsEventDetailOpen: (isOpen) => set({ isEventDetailOpen: isOpen }),
  setIsRemoveModalOpen: (isOpen) => set({ isRemoveModalOpen: isOpen }),
  setIsEditModal: (isOpen) => set({ isEditModal: isOpen }),
  setMessage: (message) => set({ message }),
  setMessageType: (messageType) => set({ messageType }),
  incrementToastUpdateCount: () =>
    set((state) => ({ toastUpdateCount: state.toastUpdateCount + 1 })),
  setIsTodoModalOpen: (isOpen) => set({ isTodoModalOpen: isOpen }),
  setIsTodoTimeModalOpen: (isOpen) => set({ isTodoTimeModalOpen: isOpen }),
  setDate: (date) => set({ date }),
  setIsAllday: (isAllday) => set({ isAllday }),
  setIsEditingTodo: (isEditingTodo) => set({ isEditingTodo }),
}));
