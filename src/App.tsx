import ToDoList from "./ToDoList.js";
import { ToastProvider } from "./Context/ToastContext.js";
import { ToDoListProvider } from "./Context/ToDoContext.js";

function App() {
  return (
    <ToDoListProvider>
      <ToastProvider>
        <div
          style={{
            direction: "rtl",
            backgroundColor: "rgba(240 240 240)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ToDoList />
        </div>
      </ToastProvider>
    </ToDoListProvider>
  );
}

export default App;