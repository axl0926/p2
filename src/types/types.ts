import { EventInput } from "@fullcalendar/core/index.js";

export type Todo = {
  id: number;
  title: string;
  dueDate?: {
    allDay: boolean;
    date: Date;
    time?: string;
  };
  completed: boolean;
};
export type TodoState = {
  todos: Todo[];
  updateTodo: (id: number, todo: Todo) => void;
  addTodo: (todo: Omit<Todo, "id">) => void;
  removeTodo: (id: number) => void;
  toggleTodoCompleted: (id: number) => void;
};
export type UIState = {
  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
  isToastOpen: boolean;
  setIsToastOpen: (isOpen: boolean) => void;
  isEventDetailOpen: boolean;
  setIsEventDetailOpen: (isOpen: boolean) => void;
  isRemoveModalOpen: boolean;
  setIsRemoveModalOpen: (isOpen: boolean) => void;
  isEditModal: boolean;
  setIsEditModal: (isOpen: boolean) => void;
  message: string;
  setMessage: (message: string) => void;
  messageType: "warning" | "checked";
  setMessageType: (messageType: "warning" | "checked") => void;
  toastUpdateCount: number;
  incrementToastUpdateCount: () => void;
  isTodoModalOpen: boolean;
  setIsTodoModalOpen: (isOpen: boolean) => void;
  isTodoTimeModalOpen: boolean;
  setIsTodoTimeModalOpen: (isOpen: boolean) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  isAllday: boolean;
  setIsAllday: (isAllday: boolean) => void;
  isEditingTodo: boolean;
  setIsEditingTodo: (isEditingTodo: boolean) => void;
};

export type EventsState = {
  events: EventInput[];
  setEvents: (events: EventInput[]) => void;
};
