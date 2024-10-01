import { ChangeEvent } from "react";

const EventTitleInput = ({ eventTitle, setEventTitle }: { eventTitle: string; setEventTitle: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEventTitle(e.target.value);
    };
    return (
        <div className="w-full  border border-[#c5c5c580] rounded-md p-2 ">
            <input className="w-full" type="text" placeholder="일정 제목" value={eventTitle} onChange={handleChange} />
        </div>
    );
};

export default EventTitleInput;
