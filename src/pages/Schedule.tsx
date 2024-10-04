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
const Schedule = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAddEventToastOpen, setIsAddEventToastOpen] = useState(false);
  const [isDeleteEventToastOpen, setIsDeleteEventToastOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
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
        editable={true}
        selectable={true}
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
          setIsEventModalOpen={setIsEventModalOpen}
          start={startDate}
          end={endDate}
          event={selectedEvent}
          setEvents={setEvents}
          setToast={setIsAddEventToastOpen}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
        />
      )}

      {isAddEventToastOpen && (
        <Toast
          setToast={setIsAddEventToastOpen}
          messageType="checked"
          message="일정이 추가되었습니다."
        />
      )}
      {isDeleteEventToastOpen && (
        <Toast
          setToast={setIsDeleteEventToastOpen}
          messageType="warning"
          message="일정이 삭제되었습니다."
        />
      )}
      {isEventDetailOpen && selectedEvent && (
        <EventDetail
          setIsRemoveModalOpen={setIsRemoveModalOpen}
          selectedEvent={selectedEvent}
          setIsEventDetailOpen={setIsEventDetailOpen}
          setIsEditModal={setIsEditModal}
          setIsEventModalOpen={setIsEventModalOpen}
        />
      )}
      {isRemoveModalOpen && selectedEvent && (
        <RemoveModal
          deleteFc={() => {
            selectedEvent.remove();
            setEvents(events.filter((event) => event.id !== selectedEvent.id));
          }}
          setIsDeleteEventToastOpen={setIsDeleteEventToastOpen}
          setIsRemoveModalOpen={setIsRemoveModalOpen}
        />
      )}
    </div>
  );
};

export default Schedule;
