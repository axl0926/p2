import { useState, useEffect } from "react";
import warning from "@/assets/warning.svg";
import checked from "@/assets/checked.svg";
import { useStore } from "@/context/useStore";

const Toast = () => {
  const message = useStore((state) => state.message);
  const messageType = useStore((state) => state.messageType);
  const toastUpdateCount = useStore((state) => state.toastUpdateCount);
  const setIsToastOpen = useStore((state) => state.setIsToastOpen);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const icon = { warning: warning, checked: checked };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsToastOpen(false);
      }, 1000); // 페이드 아웃 시간
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [toastUpdateCount, setIsToastOpen]);

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
