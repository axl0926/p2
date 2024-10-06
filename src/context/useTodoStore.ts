import { TodoState } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      updateTodo: (id, todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? todo : t)),
        })),

      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id:
                state.todos.length === 0
                  ? 0
                  : state.todos[state.todos.length - 1].id + 1,
            },
          ],
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodoCompleted: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
    }),
    {
      name: "todos", // 로컬 스토리지에 저장될 항목의 이름
    },
  ),
);
