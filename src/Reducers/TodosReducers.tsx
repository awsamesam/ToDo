import { nanoid } from "nanoid";

export type Todo = {
  Title: string;
  body: string;
  id: string;
  isCompleted: boolean;
};

export type Action =
  | {
      type: "added";
      payload: {
        newTitle: string;
      };
    }
  | {
      type: "deleted";
      payload: {
        id: string;
      };
    }
  | {
      type: "edited";
      payload: {
        id: string;
        newTitle1: string;
        newBody1: string;
      };
    }
  | {
      type: "AreCompleted";
      payload: {
        id: string;
      };
    }
  | {
      type: "Effect";
    };

export default function TodosReducers1(
  currentTodo: Todo[],
  action: Action
): Todo[] {
  switch (action.type) {
    case "added": {
      const { newTitle } = action.payload;

      if (!newTitle.trim()) {
        return currentTodo;
      }

      const newTodo: Todo = {
        Title: newTitle,
        body: "",
        id: nanoid(),
        isCompleted: false,
      };

      const updatedTodos = [...currentTodo, newTodo];

      localStorage.setItem(
        "todo2",
        JSON.stringify(updatedTodos)
      );

      return updatedTodos;
    }

    case "deleted": {
      const { id } = action.payload;

      const updatedTodos = currentTodo.filter(
        (todo) => todo.id !== id
      );

      localStorage.setItem(
        "todo2",
        JSON.stringify(updatedTodos)
      );

      return updatedTodos;
    }

    case "edited": {
      const {
        id,
        newTitle1,
        newBody1,
      } = action.payload;

      const updatedTodos = currentTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            Title: newTitle1,
            body: newBody1,
          };
        }

        return todo;
      });

      localStorage.setItem(
        "todo2",
        JSON.stringify(updatedTodos)
      );

      return updatedTodos;
    }

    case "AreCompleted": {
      const { id } = action.payload;

      const updatedTodos = currentTodo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      });

      localStorage.setItem(
        "todo2",
        JSON.stringify(updatedTodos)
      );

      return updatedTodos;
    }

    case "Effect": {
      const storedTodos = localStorage.getItem("todo2");

      if (!storedTodos) {
        return [];
      }

      try {
        return JSON.parse(storedTodos) as Todo[];
      } catch {
        return [];
      }
    }

    default:
      return currentTodo;
  }
}