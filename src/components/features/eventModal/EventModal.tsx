import { IoMdClose } from "react-icons/io";
import DateSelect from "@/components/features/eventModal/DateSelect";
import TimeSelect from "@/components/common/TimeSelect";
import EventTitleInput from "@/components/features/eventModal/EventTitleInput";
import { useState } from "react";
import { EventApi } from "@fullcalendar/core/index.js";
import { useUIStateStore } from "@/context/useUIStateStore";
import { useEventsStore } from "@/context/useEventsStore";
import { useToast } from "@/utils/toastUtils";
const EventModal = ({
  start,
  end,
  event,
}: {
  start: Date;
  end: Date;
  event?: EventApi;
}) => {
  const { showToast } = useToast();
  const setIsEditModal = useUIStateStore((state) => state.setIsEditModal);
  const setIsEventModalOpen = useUIStateStore(
    (state) => state.setIsEventModalOpen,
  );
  const isEditModal = useUIStateStore((state) => state.isEditModal);
  const setEvents = useEventsStore((state) => state.setEvents);
  const events = useEventsStore((state) => state.events);
  const [isTimeSelectVisible, setIsTimeSelectVisible] = useState(
    isEditModal && !event?.allDay ? true : false,
  );
  const [eventTitle, setEventTitle] = useState(
    event && isEditModal ? event.title : "",
  );
  const [startDate, setStartDate] = useState<Date>(
    event?.start && isEditModal ? event.start : start,
  );
  const [endDate, setEndDate] = useState<Date>(
    event?.end && isEditModal ? event.end : end,
  );

  const handleClose = () => {
    setIsEditModal(false);
    setIsEventModalOpen(false);
  };
  const handleSave = () => {
    if (isEditModal && event) {
      setEvents(
        events.map((e) =>
          e.id === event.id
            ? {
                ...e,
                title: eventTitle,
                start: startDate,
                end: endDate,
                allDay: isTimeSelectVisible ? false : true,
              }
            : e,
        ),
      );
    } else {
      setEvents([
        ...events,
        {
          id: `${events.length > 0 ? parseInt(events[events.length - 1].id as string) + 1 : 1}`,
          title: eventTitle,
          start: startDate,
          end: endDate,
          allDay: isTimeSelectVisible ? false : true,
        },
      ]);
    }
    setIsEditModal(false);
    showToast("일정이 추가되었습니다.", "checked");
    handleClose();
  };
  const getDefaultTime = (date: Date | undefined): number[] | undefined => {
    if (date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return [hours, minutes];
    }
    return undefined;
  };
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-[#00000020]">
      <div
        className={`flex w-[500px] flex-col items-center justify-center gap-5 rounded-xl border border-[#C5C5C5] bg-white p-6`}
      >
        <div className="flex w-full justify-between p-2">
          <div className="text-lg text-[#907AD6]">
            {isEditModal ? "일정 수정" : "일정 추가"}
          </div>
          <button onClick={handleClose}>
            <IoMdClose size="24" color="#79747E" />
          </button>
        </div>
        <EventTitleInput
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
        />
        <div className="w-full rounded-md border border-[#c5c5c580] p-2">
          <div className="flex w-full justify-between">
            <DateSelect
              dataType="start"
              defaultDate={startDate}
              setDate={setStartDate}
            />
            <DateSelect
              dataType="end"
              defaultDate={endDate}
              setDate={setEndDate}
            />
          </div>
          {isTimeSelectVisible && (
            <div>
              <div className="flex w-full justify-between">
                <TimeSelect
                  dataType="start"
                  setDate={setStartDate}
                  defaultTime={
                    isEditModal && !event?.allDay
                      ? getDefaultTime(startDate)
                      : undefined
                  }
                />
                <TimeSelect
                  dataType="end"
                  setDate={setEndDate}
                  defaultTime={
                    isEditModal && !event?.allDay
                      ? getDefaultTime(endDate)
                      : undefined
                  }
                />
              </div>
            </div>
          )}
          <input
            type="checkbox"
            id="timeSet"
            checked={isTimeSelectVisible}
            onChange={() => setIsTimeSelectVisible(!isTimeSelectVisible)}
          />
          <label htmlFor="timeSet">시간설정</label>
        </div>
        <div className="flex w-full justify-end gap-2">
          <button
            className="rounded-xl border-2 border-[#E5E5E5] p-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-[#907AD6] p-2 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
