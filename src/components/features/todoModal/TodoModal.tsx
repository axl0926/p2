import { IoMdClose } from "react-icons/io";
import { useUIStateStore } from "@/context/useUIStateStore";
import { useState } from "react";
import TimeSelect from "@/components/common/TimeSelect";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const TodoModal = () => {
  const date = useUIStateStore((state) => state.date);
  const setDate = useUIStateStore((state) => state.setDate);
  const isAllday = useUIStateStore((state) => state.isAllday);
  const setIsAllday = useUIStateStore((state) => state.setIsAllday);

  const initialDate = () => {
    const d = date ? new Date(date) : new Date();
    if (isAllday) {
      d.setHours(0);
      d.setMinutes(0);
    }
    return d;
  };
  const [selected, setSelected] = useState<Date>(initialDate());
  const setIsTodoTimeModalOpen = useUIStateStore(
    (state) => state.setIsTodoTimeModalOpen,
  );
  const setIsTodoModalOpen = useUIStateStore(
    (state) => state.setIsTodoModalOpen,
  );
  const handleClose = () => {
    setIsTodoTimeModalOpen(false);
    setIsTodoModalOpen(false);
  };
  const handleSave = () => {
    setDate(selected);
    handleClose();
  };
  const handleSelect = (date: Date) => {
    setSelected((d) => {
      const newDate = d ? new Date(d) : new Date();
      newDate.setDate(date.getDate());
      newDate.setMonth(date.getMonth());
      newDate.setFullYear(date.getFullYear());
      newDate.setHours(0);
      newDate.setMinutes(0);
      return newDate;
    });
  };
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-[#00000020]">
      <div
        className={`flex w-[500px] flex-col items-center justify-center gap-5 rounded-xl border border-[#C5C5C5] bg-white p-6`}
      >
        <div className="flex w-full justify-between p-2">
          <div className="text-lg text-[#907AD6]">마감 기한 지정</div>
          <button onClick={handleClose}>
            <IoMdClose size="24" color="#79747E" />
          </button>
        </div>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          required
          classNames={{
            weekdays: `text-[#4F518C] `,
            month_caption: `text-[#4F518C] h-[2.75rem] flex align-center `,
            chevron: `fill-black size-4`,
            selected: `bg-[#C5B4FB] border-none rounded-full text-white`,
            today: `text-[black]`,
          }}
        />
        {!isAllday && (
          <div className="flex w-full justify-between">
            <TimeSelect
              dataType="end"
              setDate={setSelected}
              defaultTime={[selected.getHours(), selected.getMinutes()]}
            />
          </div>
        )}
        <div className="flex w-full justify-start p-2">
          <input
            type="checkbox"
            id="timeSet"
            checked={!isAllday}
            onChange={() => setIsAllday(!isAllday)}
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

export default TodoModal;
