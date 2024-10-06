import warning from "@/assets/warning.svg";
import { useUIStateStore } from "@/context/useUIStateStore";

const RemoveModal = ({ deleteFc }: { deleteFc: () => void }) => {
  const setIsRemoveModalOpen = useUIStateStore(
    (state) => state.setIsRemoveModalOpen,
  );

  const modalClose = () => {
    setIsRemoveModalOpen(false);
  };
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-[#00000020]">
      <div
        className={`flex min-w-[500px] flex-col items-center justify-center gap-5 rounded-xl border border-[#C5C5C5] bg-white p-6`}
      >
        <div className="flex gap-2 text-xl font-bold">
          <div>
            <img src={warning} />
          </div>
          삭제하시겠습니까?
        </div>
        <div className="flex gap-2">
          <button
            className="w-20 rounded-xl border-2 border-[#E5E5E5] p-2"
            onClick={modalClose}
          >
            아니오
          </button>
          <button
            className="w-20 rounded-xl bg-[#907AD6] p-2 text-white"
            onClick={deleteFc}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
