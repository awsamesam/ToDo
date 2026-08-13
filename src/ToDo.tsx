import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import { IconButton } from "@mui/material";

import "./ToDo.css";

import { useToast } from "./Context/ToastContext.js";
import { useDispatch } from "./Context/ToDoContext.js";

import type { Todo } from "./Reducers/TodosReducers.js";

type TodoProps = {
  All: Todo;
  showDelete1: (todo: Todo) => void;
  showedit1: (todo: Todo) => void;
};

export default function ToDo({
  All,
  showDelete1,
  showedit1,
}: TodoProps) {
  const { showHideToast } = useToast();
  const dispatch = useDispatch();

  function handleComplete() {
    dispatch({
      type: "AreCompleted",
      payload: {
        id: All.id,
      },
    });

    showHideToast(
      All.isCompleted
        ? "تم الغاء تسجيل المهمة"
        : "تم تسجيل المهمة"
    );
  }

  return (
    <Card
      className="card"
      sx={{
        width: "100%",
        maxWidth: 550,
        backgroundColor: "blue",
        padding: "0px 15px",
        margin: "10px auto",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid size={8}>
          <h1
            style={{
              marginBottom: "0px",
              color: "white",
              textDecoration: All.isCompleted
                ? "line-through"
                : "none",
            }}
          >
            {All.Title}
          </h1>

          <h3
            style={{
              marginTop: "0px",
              color: "white",
            }}
          >
            {All.body}
          </h3>
        </Grid>

        <Grid size={4}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <IconButton
              onClick={handleComplete}
              className="Done"
              aria-label="done"
              style={{
                color: All.isCompleted
                  ? "white"
                  : "#8bc34a",
                backgroundColor: All.isCompleted
                  ? "#8bc34a"
                  : "white",
                border: All.isCompleted
                  ? "solid #ffffff 3px"
                  : "solid #8bc34a 3px",
              }}
            >
              <DoneIcon />
            </IconButton>

            <IconButton
              className="Edit"
              aria-label="edit"
              style={{
                color: "#1769aa",
                backgroundColor: "white",
                border: "solid #1769aa 3px",
              }}
              onClick={(event) => {
                event.currentTarget.blur();
                showedit1(All);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => showDelete1(All)}
              className="Delet"
              aria-label="delete"
              style={{
                color: "#b23c17",
                backgroundColor: "white",
                border: "solid #b23c17 3px",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}