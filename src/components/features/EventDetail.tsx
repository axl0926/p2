import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { EventApi } from "@fullcalendar/core/index.js";
import { useStore } from "@/context/useStore";

const EventDetail = ({ selectedEvent }: { selectedEvent: EventApi }) => {
  const setIsEventDetailOpen = useStore((state) => state.setIsEventDetailOpen);
  const setIsEditModal = useStore((state) => state.setIsEditModal);
  const setIsEventModalOpen = useStore((state) => state.setIsEventModalOpen);
  const setIsRemoveModalOpen = useStore((state) => state.setIsRemoveModalOpen);

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-[#00000020]">
      <div
        className={`flex min-w-[300px] flex-col justify-center gap-5 rounded-xl border border-[#C5C5C5] bg-white p-6`}
      >
        <div className="flex justify-between">
          <div className="text-xl">{selectedEvent.title}</div>
          <div className="flex">
            <MdOutlineModeEdit
              color="#79747E"
              size="18px"
              onClick={() => {
                setIsEditModal(true);
                setIsEventModalOpen(true);
                setIsEventDetailOpen(false);
              }}
            />
            <RiDeleteBin6Line
              color="#79747E"
              size="18px"
              onClick={() => {
                setIsRemoveModalOpen(true);
                setIsEventDetailOpen(false);
              }}
            />
            <IoMdClose
              color="#79747E"
              size="18px"
              onClick={() => {
                setIsEventDetailOpen(false);
              }}
            />
          </div>
        </div>
        <div>{`${selectedEvent.start?.getMonth()}월${selectedEvent.start?.getDate()}일${selectedEvent.start?.getHours()}:${selectedEvent.start?.getMinutes()} ~ ${selectedEvent.end?.getMonth()}월${selectedEvent.end?.getDate()}일${selectedEvent.end?.getHours()}:${selectedEvent.end?.getMinutes()}`}</div>
      </div>
    </div>
  );
};

export default EventDetail;
