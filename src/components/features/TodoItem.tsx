import { Todo } from "@/types/types";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { useTodoStore } from "@/context/useTodoStore";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useUIStateStore } from "@/context/useUIStateStore";
import { useToast } from "@/utils/toastUtils";
const TodoItem = ({ todo }: { todo: Todo }) => {
  const { showToast } = useToast();
  const toggleTodoCompleted = useTodoStore(
    (state) => state.toggleTodoCompleted,
  );
  const setIsEditingTodo = useUIStateStore((state) => state.setIsEditingTodo);
  const [title, setTitle] = useState(todo.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const date = useUIStateStore((state) => state.date);
  const isAllday = useUIStateStore((state) => state.isAllday);
  const setIsTodoModalOpen = useUIStateStore(
    (state) => state.setIsTodoModalOpen,
  );

  const setDate = useUIStateStore((state) => state.setDate);
  const setIsAllday = useUIStateStore((state) => state.setIsAllday);

  useEffect(() => {
    if (inputRef.current) {
      const length = title.length;
      inputRef.current.style.width = `${length + 1}ch`;
    }
  }, [title]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div
      className={`relative flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-2 shadow-todoItem ${todo.completed ? "bg-[#E6FAEA]" : "bg-white"}`}
      onClick={() => {
        toggleTodoCompleted(todo.id);
      }}
    >
      <div className="flex h-12 flex-col justify-center">
        {isEditMode ? (
          <input
            ref={inputRef}
            className="bg-transparent font-extrabold"
            value={title}
            onChange={handleChange}
          />
        ) : (
          <input
            ref={inputRef}
            className="bg-transparent font-extrabold"
            value={title}
            disabled
          />
        )}

        {todo.dueDate && (
          <div
            className="flex items-center text-sm text-[#C5B4FB]"
            onClick={() => {
              if (isEditMode) {
                if (todo.dueDate) {
                  setIsAllday(todo.dueDate.allDay);
                  setDate(todo.dueDate.date);
                }
                setIsTodoModalOpen(true);
              }
            }}
          >
            <AiFillClockCircle color="#C5B4FB" />
            {isEditMode && date
              ? format(date, "yy.MM.dd")
              : format(todo.dueDate.date, "yy.MM.dd")}
          </div>
        )}
      </div>
      {isEditMode ? (
        <div
          className="flex w-[12%] items-center justify-center rounded-xl bg-[#907AD6] p-2"
          onClick={() => {
            if (title) {
              updateTodo(
                todo.id,
                todo.dueDate && date
                  ? {
                      ...todo,
                      title,
                      dueDate: { date: date, allDay: isAllday },
                    }
                  : { ...todo, title },
              );
              showToast("수정 완료되었습니다.", "checked");
              setDate(undefined);
              setIsAllday(true);
              setIsEditMode(false);
              setIsEditingTodo(false);
            } else {
              showToast("할 일을 입력해주세요.", "warning");
            }
          }}
        >
          <FaCheck color="white" size="24" />
        </div>
      ) : (
        <div>
          <IoEllipsisVerticalSharp
            color="#888888"
            size="24"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute right-0 top-0 flex -translate-x-1/3 flex-col rounded-xl bg-white p-2 shadow-todoItem">
          <div
            className="border-b"
            onClick={() => {
              setIsEditingTodo(true);
              setIsEditMode(true);
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            수정
          </div>
          <div
            className="border-t"
            onClick={() => {
              showToast("삭제되었습니다.", "warning");
              removeTodo(todo.id);
            }}
          >
            삭제
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
