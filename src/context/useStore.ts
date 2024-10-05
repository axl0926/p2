import { create } from "zustand";

interface ScheduleState {
  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
  isAddEventToastOpen: boolean;
  setIsAddEventToastOpen: (isOpen: boolean) => void;
  isDeleteEventToastOpen: boolean;
  setIsDeleteEventToastOpen: (isOpen: boolean) => void;
  isEventDetailOpen: boolean;
  setIsEventDetailOpen: (isOpen: boolean) => void;
  isRemoveModalOpen: boolean;
  setIsRemoveModalOpen: (isOpen: boolean) => void;
  isEditModal: boolean;
  setIsEditModal: (isOpen: boolean) => void;
}

export const useStore = create<ScheduleState>((set) => ({
  isEventModalOpen: false,
  setIsEventModalOpen: (isOpen) => set({ isEventModalOpen: isOpen }),
  isAddEventToastOpen: false,
  setIsAddEventToastOpen: (isOpen) => set({ isAddEventToastOpen: isOpen }),
  isDeleteEventToastOpen: false,
  setIsDeleteEventToastOpen: (isOpen) =>
    set({ isDeleteEventToastOpen: isOpen }),
  isEventDetailOpen: false,
  setIsEventDetailOpen: (isOpen) => set({ isEventDetailOpen: isOpen }),
  isRemoveModalOpen: false,
  setIsRemoveModalOpen: (isOpen) => set({ isRemoveModalOpen: isOpen }),
  isEditModal: false,
  setIsEditModal: (isOpen) => set({ isEditModal: isOpen }),
}));
