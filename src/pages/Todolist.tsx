import { useTodoStore } from "@/context/useTodoStore";
import { AiFillClockCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import TodoItem from "@/components/features/TodoItem";
import { useEffect, useRef, useState } from "react";
import { useUIStateStore } from "@/context/useUIStateStore";
import TodoModal from "@/components/features/todoModal/TodoModal";
import { format } from "date-fns";
import { useToast } from "@/utils/toastUtils";
const Todolist = () => {
  const { showToast } = useToast();
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const isEditingTodo = useUIStateStore((state) => state.isEditingTodo);
  const isTodoModalOpen = useUIStateStore((state) => state.isTodoModalOpen);
  const setIsTodoModalOpen = useUIStateStore(
    (state) => state.setIsTodoModalOpen,
  );
  const [title, setTitle] = useState("");
  const date = useUIStateStore((state) => state.date);
  const setDate = useUIStateStore((state) => state.setDate);
  const isAllday = useUIStateStore((state) => state.isAllday);
  const [completedInclude, setCompletedInclude] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      const length = title.length;
      inputRef.current.style.width = `${length + 1}ch`;
    }
  }, [title]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAddTodo = () => {
    if (title) {
      addTodo(
        date
          ? {
              title: title,
              completed: false,
              dueDate: { date: date, allDay: isAllday },
            }
          : { title: title, completed: false },
      );
      setDate(undefined);
      showToast("할 일이 추가되었습니다.", "checked");
      setTitle("");
    } else {
      showToast("할 일을 입력해주세요.", "warning");
    }
  };

  return (
    <div className="flex h-screen w-[calc(100vw-300px)] items-center justify-center bg-[#EBE7FD] p-2">
      <div className="h-fit w-[40%] items-center rounded-2xl border-white bg-[rgba(255,255,255,0.2)] p-6">
        <div className="flex h-[90vh] flex-col items-center gap-4 rounded-2xl bg-white p-10">
          <div className="text-5xl font-extrabold"> ToDoList</div>
          <div className="flex w-full justify-center gap-4">
            <div className="flex h-12 w-10/12 items-center justify-between rounded-xl border border-[#c5c5c580] p-2">
              <div className="flex h-full w-[calc(100%-24px)] items-center ">
                <input
                  ref={inputRef}
                  value={title}
                  type="text"
                  placeholder="할 일을 입력하세요"
                  onChange={handleChange}
                  className={`${title ? "min-w-[50px]" : "min-w-[150px]"} font-bold text-[#907AD6]`}
                />
                {date && !isEditingTodo && (
                  <div className="rounded-md bg-[#907AD6] px-2 text-white">
                    {isAllday
                      ? format(date, "yy.MM.dd")
                      : format(date, "yy.MM.dd HH:mm")}
                  </div>
                )}
              </div>

              <AiFillClockCircle
                color="#C5B4FB"
                size="24"
                onClick={() => setIsTodoModalOpen(true)}
              />
            </div>
            <div
              className="flex w-[12%] items-center justify-center rounded-xl bg-[#907AD6] p-2"
              onClick={handleAddTodo}
            >
              <FaPlus color="white" size="24" />
            </div>
          </div>
          <div className="flex w-full justify-end gap-2 p-2">
            <input
              type="checkbox"
              id="completed_include"
              checked={completedInclude}
              onChange={() => setCompletedInclude(!completedInclude)}
            />
            <label htmlFor="completed_include">완료된 내역 포함</label>
          </div>
          <div className="scrollbar-hide flex w-full flex-col p-2 gap-4 overflow-auto">
            {todos.map((v) => {
              return completedInclude ? (
                <TodoItem key={v.id} todo={v} />
              ) : v.completed ? null : (
                <TodoItem key={v.id} todo={v} />
              );
            })}
          </div>
        </div>
        {isTodoModalOpen && <TodoModal />}
      </div>
    </div>
  );
};

export default Todolist;
