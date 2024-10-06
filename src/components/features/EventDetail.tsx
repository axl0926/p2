import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { EventApi } from "@fullcalendar/core/index.js";
import { useUIStateStore } from "@/context/useUIStateStore";

const EventDetail = ({ selectedEvent }: { selectedEvent: EventApi }) => {
  const setIsEventDetailOpen = useUIStateStore(
    (state) => state.setIsEventDetailOpen,
  );
  const setIsEditModal = useUIStateStore((state) => state.setIsEditModal);
  const setIsEventModalOpen = useUIStateStore(
    (state) => state.setIsEventModalOpen,
  );
  const setIsRemoveModalOpen = useUIStateStore(
    (state) => state.setIsRemoveModalOpen,
  );

  const handleEdit = () => {
    setIsEditModal(true);
    setIsEventModalOpen(true);
    setIsEventDetailOpen(false);
  };
  const handleDelete = () => {
    setIsRemoveModalOpen(true);
    setIsEventDetailOpen(false);
  };
  const handleClose = () => {
    setIsEventDetailOpen(false);
  };

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
              onClick={handleEdit}
            />
            <RiDeleteBin6Line
              color="#79747E"
              size="18px"
              onClick={handleDelete}
            />
            <IoMdClose color="#79747E" size="18px" onClick={handleClose} />
          </div>
        </div>
        <div>{`${selectedEvent.start?.getMonth()}월${selectedEvent.start?.getDate()}일${selectedEvent.start?.getHours()}:${selectedEvent.start?.getMinutes()} ~ ${selectedEvent.end?.getMonth()}월${selectedEvent.end?.getDate()}일${selectedEvent.end?.getHours()}:${selectedEvent.end?.getMinutes()}`}</div>
      </div>
    </div>
  );
};

export default EventDetail;
