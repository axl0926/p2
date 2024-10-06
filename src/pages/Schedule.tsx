import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/features/eventModal/EventModal";
import { useState } from "react";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/core/index.js";
import "@/pages/calendar.css";
import Toast from "@components/common/Toast";
import EventDetail from "@components/features/EventDetail";
import RemoveModal from "@components/common/RemoveModal";
import { useUIStateStore } from "@/context/useUIStateStore";
import { useToast } from "@/utils/toastUtils";
import { useEventsStore } from "@/context/useEventsStore";

const Schedule = () => {
  const isEventModalOpen = useUIStateStore((state) => state.isEventModalOpen);
  const setIsEventModalOpen = useUIStateStore(
    (state) => state.setIsEventModalOpen,
  );
  const isToastOpen = useUIStateStore((state) => state.isToastOpen);
  const { showToast } = useToast();
  const isEventDetailOpen = useUIStateStore((state) => state.isEventDetailOpen);
  const setIsEventDetailOpen = useUIStateStore(
    (state) => state.setIsEventDetailOpen,
  );
  const isRemoveModalOpen = useUIStateStore((state) => state.isRemoveModalOpen);
  const setIsRemoveModalOpen = useUIStateStore(
    (state) => state.setIsRemoveModalOpen,
  );

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const events = useEventsStore((state) => state.events);
  const setEvents = useEventsStore((state) => state.setEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventApi>();

  const handleDateSelect = (selectInfo: DateSelectArg): void => {
    const calendarApi = selectInfo.view.calendar;
    setStartDate(selectInfo.start);
    setEndDate(selectInfo.end);
    setIsEventModalOpen(true);
    calendarApi.unselect();
  };
  const handleEventClick = (eventInfo: EventClickArg) => {
    if (eventInfo.event.start && eventInfo.event.title) {
      setSelectedEvent(eventInfo.event);
      setIsEventDetailOpen(true);
    }
  };

  const eventDelete = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      showToast("일정이 삭제되었습니다.", "warning");
      setIsRemoveModalOpen(false);
    }
  };
  return (
    <div className="h-screen w-[calc(100vw-300px)] p-2">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "today",
          center: "prev title next",
          right: "dayGridMonth,timeGridWeek",
        }}
        height="100%"
        editable={false}
        selectable={true}
        dragScroll={false}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        initialView="dayGridMonth"
        views={{
          dayGrid: {
            dayMaxEventRows: 3,
          },
        }}
      />
      {isEventModalOpen && startDate && endDate && (
        <EventModal start={startDate} end={endDate} event={selectedEvent} />
      )}
      {isToastOpen && <Toast />}
      {isEventDetailOpen && selectedEvent && (
        <EventDetail selectedEvent={selectedEvent} />
      )}
      {isRemoveModalOpen && <RemoveModal deleteFc={eventDelete} />}
    </div>
  );
};

export default Schedule;
