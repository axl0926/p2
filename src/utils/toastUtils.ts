import { useStore } from "@/context/useStore";

export const useToast = () => {
  const setMessage = useStore((state) => state.setMessage);
  const setMessageType = useStore((state) => state.setMessageType);
  const setIsToastOpen = useStore((state) => state.setIsToastOpen);
  const incrementToastUpdateCount = useStore(
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
