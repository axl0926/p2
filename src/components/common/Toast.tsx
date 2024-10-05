import { useState, useEffect } from "react";
import warning from "@/assets/warning.svg";
import checked from "@/assets/checked.svg";
import { useStore } from "@/context/useStore";

const Toast = ({
  message,
  messageType = "checked",
  timeout = 2000,
}: {
  message: string;
  messageType: "warning" | "checked";
  timeout?: number;
}) => {
  const isAddEventToastOpen = useStore((state) => state.isAddEventToastOpen);
  const isDeleteEventToastOpen = useStore(
    (state) => state.isDeleteEventToastOpen,
  );
  const setIsAddEventToastOpen = useStore(
    (state) => state.setIsAddEventToastOpen,
  );
  const setIsDeleteEventToastOpen = useStore(
    (state) => state.setIsDeleteEventToastOpen,
  );
  const isOpen = isAddEventToastOpen || isDeleteEventToastOpen;

  const [isFadingOut, setIsFadingOut] = useState(false);
  const icon = { warning: warning, checked: checked };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (messageType === "checked") {
            setIsAddEventToastOpen(false);
          } else {
            setIsDeleteEventToastOpen(false);
          }
        }, 1000); // 페이드 아웃 시간
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    isOpen,
    timeout,
    setIsAddEventToastOpen,
    setIsDeleteEventToastOpen,
    messageType,
  ]);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed left-1/2 top-4 flex h-[80px] w-[500px] -translate-x-1/2 items-center justify-center gap-2 rounded-2xl bg-[#dadada81] p-2 font-bold transition-opacity duration-1000 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
    >
      <div>
        <img src={icon[messageType]} />
      </div>
      {message}
    </div>
  );
};

export default Toast;
