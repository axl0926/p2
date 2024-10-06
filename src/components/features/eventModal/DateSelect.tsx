import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const DateSelect = ({
  dataType,
  setDate,
  defaultDate = undefined,
}: {
  dataType: "start" | "end";
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  defaultDate?: Date;
}) => {
  const text = dataType === "start" ? "시작일" : "종료일";
  const [selected, setSelected] = useState<Date | undefined>(defaultDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleSelect = (date: Date) => {
    setSelected(date);
    setDate((d) => {
      const newDate = d ? new Date(d) : new Date();
      newDate.setDate(date.getDate());
      newDate.setMonth(date.getMonth());
      newDate.setFullYear(date.getFullYear());
      return newDate;
    });
    setIsDatePickerOpen(false);
  };
  return (
    <div className="flex w-1/2 flex-col p-2">
      <div className="text-[#7E7E7E]">{text}</div>
      <div
        className={`relative h-10 rounded-md border p-2 ${isDatePickerOpen ? "border-[#8f7ad64d]" : "border-[#c5c5c580]"} `}
      >
        <input
          type="text"
          placeholder={`${text} 설정`}
          value={selected?.toLocaleDateString()}
          readOnly
          onClick={() => {
            setIsDatePickerOpen(!isDatePickerOpen);
          }}
        />
        {isDatePickerOpen && (
          <div className="absolute left-0 top-10 z-20 rounded-md border border-[#8f7ad64d] bg-white p-8">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelect;
