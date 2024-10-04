import Select from "react-select";
import { SingleValue } from "react-select";

const hourOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${`${i}`.padStart(2, "0")}`,
}));

const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
  value: i,
  label: `${`${i}`.padStart(2, "0")}`,
}));

const TimeSelect = ({
  dataType,
  setDate,
  defaultTime,
}: {
  dataType: "start" | "end";
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  defaultTime?: number[];
}) => {
  const text = dataType === "start" ? "시작시간" : "종료시간";

  const handleHourChange = (
    newValue: SingleValue<{ label: string; value: number }>,
  ) => {
    if (newValue) {
      setDate((date) => {
        const newDate = date ? new Date(date) : new Date();
        newDate.setHours(newValue.value);
        return newDate;
      });
    }
  };
  const handleMinuteChange = (
    newValue: SingleValue<{ label: string; value: number }>,
  ) => {
    if (newValue) {
      setDate((date) => {
        const newDate = date ? new Date(date) : new Date();
        newDate.setMinutes(newValue.value);
        return newDate;
      });
    }
  };
  return (
    <div className="flex w-1/2 flex-col p-2">
      <div>{text}</div>
      <div className="flex justify-between">
        <Select
          options={hourOptions}
          placeholder="00"
          defaultValue={defaultTime&&hourOptions.find(
            (option) => option.value === defaultTime[0],
          )}
          classNames={{ container: () => "w-[45%]" }}
          onChange={handleHourChange}
        />
        <Select
          options={minuteOptions}
          placeholder="00"
          defaultValue={defaultTime&&minuteOptions.find(
            (option) => option.value === defaultTime[1],
          )}
          classNames={{ container: () => "w-[45%]" }}
          onChange={handleMinuteChange}
        />
      </div>
    </div>
  );
};

export default TimeSelect;
