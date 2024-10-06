import { useUIStateStore } from "@/context/useUIStateStore";

export const useToast = () => {
  const setMessage = useUIStateStore((state) => state.setMessage);
  const setMessageType = useUIStateStore((state) => state.setMessageType);
  const setIsToastOpen = useUIStateStore((state) => state.setIsToastOpen);
  const incrementToastUpdateCount = useUIStateStore(
    (state) => state.incrementToastUpdateCount,
  );
  const showToast = (message: string, messageType: "warning" | "checked") => {
    setMessage(message);
    setMessageType(messageType);
    incrementToastUpdateCount();
    setIsToastOpen(true);
  };

  return { showToast };
};
