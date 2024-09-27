import { useState, useEffect } from "react";
import warning from "@/assets/warning.svg";
import checked from "@/assets/checked.svg";

const Toast = ({ setToast, message, messageType = "checked", timeout = 2000 }: { setToast: React.Dispatch<React.SetStateAction<boolean>>; message: string; messageType: "warning" | "checked"; timeout: number }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const icon = { warning: warning, checked: checked };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setToast(false);
            }, timeout - 1000);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`flex gap-2 font-bold p-2 rounded-2xl fixed top-4 left-1/2 -translate-x-1/2 bg-[#dadada81] h-[80px] w-[500px] items-center justify-center transition-opacity duration-1000 ${isFadingOut ? "opacity-0" : "opacity-100"}`}>
            <div>
                <img src={icon[messageType]} />
            </div>
            {message}
        </div>
    );
};

export default Toast;
