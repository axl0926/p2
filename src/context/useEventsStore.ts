import { EventsState } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),
    }),
    {
      name: "schedule-events", // 로컬 스토리지에 저장될 항목의 이름
    },
  ),
);
