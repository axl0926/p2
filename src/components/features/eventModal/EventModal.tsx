import { IoMdClose } from "react-icons/io";
import DateSelect from "@/components/features/eventModal/DateSelect";
import TimeSelect from "@/components/features/eventModal/TimeSelect";
import EventTitleInput from "@/components/features/eventModal/EventTitleInput";
import { useState } from "react";
import { EventInput } from "@fullcalendar/core/index.js";

const EventModal = ({ setIsEventModalOpen, start, end, events, setEvents }: { setIsEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>; start: Date | undefined; end: Date | undefined; events: EventInput[]; setEvents: React.Dispatch<React.SetStateAction<EventInput[]>> }) => {
    const [isTimeSelectVisible, setIsTimeSelectVisible] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>(start);
    const [endDate, setEndDate] = useState<Date | undefined>(end);
    const isRange = !(start && end && start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate());

    const handleClose = () => {
        setIsEventModalOpen(false);
    };
    const handleSave = () => {
        setEvents([
            ...events,
            {
                id: `${events.length + 1}`,
                title: eventTitle,
                start: startDate,
                end: endDate,
                allDay: true,
            },
        ]);
        console.log(events);
        handleClose();
    };
    return (
        <div className="bg-[#00000020] fixed flex justify-center items-center h-screen w-screen top-0 left-0 z-10">
            <div className={`flex flex-col bg-white p-6 rounded-xl items-center justify-center w-[500px] gap-5 border border-[#C5C5C5] `}>
                <div className="flex justify-between w-full p-2 ">
                    <div className="text-[#907AD6] text-lg">일정 추가</div>
                    <button onClick={handleClose}>
                        <IoMdClose size="24" color="#79747E" />
                    </button>
                </div>
                <EventTitleInput eventTitle={eventTitle} setEventTitle={setEventTitle} />
                <div className="w-full  border border-[#c5c5c580] rounded-md  p-2 ">
                    <div className="flex w-full justify-between">
                        <DateSelect dataType="start" defaultDate={start} setDate={setStartDate} />

                        {isRange ? <DateSelect dataType="end" defaultDate={end} setDate={setEndDate} /> : <DateSelect dataType="end" setDate={setEndDate} />}
                    </div>
                    {isTimeSelectVisible && (
                        <div>
                            <div className="flex w-full justify-between">
                                <TimeSelect dataType="start" setDate={setStartDate} />
                                <TimeSelect dataType="end" setDate={setEndDate} />
                            </div>
                        </div>
                    )}
                    <input type="checkbox" id="timeSet" checked={isTimeSelectVisible} onChange={() => setIsTimeSelectVisible(!isTimeSelectVisible)} />
                    <label htmlFor="timeSet">시간설정</label>
                </div>
                <div className="flex w-full justify-end gap-2">
                    <button className="p-2 rounded-xl border-2 border-[#E5E5E5]" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="p-2 rounded-xl text-white bg-[#907AD6]" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;

