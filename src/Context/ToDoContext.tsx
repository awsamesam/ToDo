import { createContext, useContext, useReducer } from "react";

import type { ReactNode, Dispatch } from "react";

import TodosReducers1 from "../Reducers/TodosReducers.js";
import type { Todo,Action } from "../Reducers/TodosReducers.js";

export const ToDoListContext = createContext<Todo[]>([]);

export const DispatchContext = createContext<Dispatch<Action> | null>(null);

type ToDoListProviderProps = {
  children: ReactNode;
};

export const ToDoListProvider = ({ children }: ToDoListProviderProps) => {
  const [todos, dispatch] = useReducer(TodosReducers1, []);

  return (
    <ToDoListContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ToDoListContext.Provider>
  );
};

export const useToDos = (): Todo[] => {
  return useContext(ToDoListContext);
};

export const useDispatch = (): Dispatch<Action> => {
  const context = useContext(DispatchContext);

  if (context === null) {
    throw new Error("useDispatch must be used inside ToDoListProvider");
  }

  return context;
};
