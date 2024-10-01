import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/features/eventModal/EventModal";
import { useState } from "react";
import { DateSelectArg, EventInput } from "@fullcalendar/core/index.js";

const Schedule = () => {
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [events, setEvents] = useState<EventInput[]>([]);

    const handleDateSelect = (selectInfo: DateSelectArg): void => {
        const calendarApi = selectInfo.view.calendar;
        setStartDate(selectInfo.start);
        setEndDate(new Date(selectInfo.end.setDate(selectInfo.end.getDate() - 1))); //fullcalendar의 select.end는 선택한날짜+1일을 반환하기때문에 하루를 빼줌
        setIsEventModalOpen(true);
        calendarApi.unselect();
    };

    return (
        <div className=" w-[calc(100vw-300px)] h-screen">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "today",
                    center: "prev title next",
                    right: "dayGridMonth,dayGridWeek",
                }}
                height="100%"
                editable={true}
                selectable={true}
                select={handleDateSelect}
                events={events}
                initialView="dayGridMonth"
                views={{
                    dayGrid: {
                        dayMaxEventRows: 3,
                    },
                }}
            />
            {isEventModalOpen && <EventModal setIsEventModalOpen={setIsEventModalOpen} start={startDate} end={endDate} events={events} setEvents={setEvents}/>}
        </div>
    );
};

export default Schedule;
