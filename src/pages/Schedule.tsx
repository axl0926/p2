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
  EventInput,
} from "@fullcalendar/core/index.js";
import "@/pages/calendar.css";
import Toast from "@components/common/Toast";
import EventDetail from "@components/features/EventDetail";
import RemoveModal from "@/components/layout/RemoveModal";
import { useStore } from "@/context/useStore";

const Schedule = () => {
  const isEventModalOpen = useStore((state) => state.isEventModalOpen);
  const setIsEventModalOpen = useStore((state) => state.setIsEventModalOpen);
  const isAddEventToastOpen = useStore((state) => state.isAddEventToastOpen);
  const isDeleteEventToastOpen = useStore(
    (state) => state.isDeleteEventToastOpen,
  );
  const isEventDetailOpen = useStore((state) => state.isEventDetailOpen);
  const setIsEventDetailOpen = useStore((state) => state.setIsEventDetailOpen);
  const isRemoveModalOpen = useStore((state) => state.isRemoveModalOpen);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [events, setEvents] = useState<EventInput[]>([]);
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
        // editable={false}
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
      {isEventModalOpen && (
        <EventModal
          start={startDate}
          end={endDate}
          event={selectedEvent}
          setEvents={setEvents}
        />
      )}

      {isAddEventToastOpen && (
        <Toast messageType="checked" message="일정이 추가되었습니다." />
      )}
      {isDeleteEventToastOpen && (
        <Toast messageType="warning" message="일정이 삭제되었습니다." />
      )}
      {isEventDetailOpen && selectedEvent && (
        <EventDetail selectedEvent={selectedEvent} />
      )}
      {isRemoveModalOpen && selectedEvent && (
        <RemoveModal
          deleteFc={() => {
            selectedEvent.remove();
            setEvents(events.filter((event) => event.id !== selectedEvent.id));
          }}
        />
      )}
    </div>
  );
};

export default Schedule;
