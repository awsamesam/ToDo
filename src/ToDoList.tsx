import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useMemo, useState } from "react";

import ToDo from "./ToDo.js";

import { useDispatch, useToDos } from "./Context/ToDoContext.js";

import { useToast } from "./Context/ToastContext.js";

import type { Todo } from "./Reducers/TodosReducers.js";

type DisplayedTodosType = "all" | "isCompeleted" | "isNotCompeleted";

export default function ToDoList() {
  const todos = useToDos();
  const dispatch = useDispatch();
  const { showHideToast } = useToast();

  const [newTodos, setNewTodos] = useState<string>("");

  const [displayedTodosType, setDisplayedTodosType] =
    useState<DisplayedTodosType>("all");

  const [showDeleteAlret, setShowDeleteAlret] = useState<boolean>(false);

  const [deleteDialogTodo, setDeleteDialogTodo] = useState<Todo | null>(null);

  const [showEditAlret, setshowEditAlret] = useState<boolean>(false);

  const [newTitleBody, setNewTitleBody] = useState({
    editTitle1: "",
    editBody: "",
  });
const todoss = useMemo(() => {
  if (displayedTodosType === "isCompeleted") {
    return todos.filter((todo) => todo.isCompleted);
  }

  if (displayedTodosType === "isNotCompeleted") {
    return todos.filter((todo) => !todo.isCompleted);
  }

  return todos;
}, [todos, displayedTodosType]);

  function changeValueTodos1(
    _event: React.MouseEvent<HTMLElement>,
    value: DisplayedTodosType | null,
  ) {
    if (value !== null) {
      setDisplayedTodosType(value);
    }
  }

  useEffect(() => {
    dispatch({
      type: "Effect",
    });
  }, [dispatch]);

  function handelClickAddTOdo() {
    if (!newTodos.trim()) return;

    dispatch({
      type: "added",
      payload: {
        newTitle: newTodos,
      },
    });

    showHideToast("تم الاضافة بشكل صحيح");

    setNewTodos("");
  }

  function showDelete(todo: Todo) {
    setDeleteDialogTodo(todo);
    setShowDeleteAlret(true);
  }

  function showedit(todo: Todo) {
    setDeleteDialogTodo(todo);
    setshowEditAlret(true);

    setNewTitleBody({
      editTitle1: todo.Title,
      editBody: todo.body,
    });
  }

  return (
    <>
      {/* Delete Dialog */}

      <Dialog
        open={showDeleteAlret}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: "35px",
            textAlign: "center",
          }}
        >
          هل انت متاكد من رغبتك في حذف المهمة؟
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              textAlign: "center",
            }}
          >
            لا يمكنك التراجع عن الحذف في حال تم اختيار زر الحذف
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            direction: "rtl",
          }}
        >
          <Button
            sx={{
              color: "red",
              fontSize: "20px",
            }}
            onClick={() => {
              setShowDeleteAlret(false);
            }}
          >
            اغلاق
          </Button>

          <Button
            sx={{
              color: "red",
              fontSize: "20px",
            }}
            autoFocus
            onClick={() => {
              if (!deleteDialogTodo) return;

              dispatch({
                type: "deleted",
                payload: {
                  id: deleteDialogTodo.id,
                },
              });

              setShowDeleteAlret(false);

              showHideToast("تم الحذف بنجاح");
            }}
          >
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}

      <Dialog
        open={showEditAlret}
        sx={{
          direction: "rtl",
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "25px",
          }}
        >
          تعديل المهمة
        </DialogTitle>

        <DialogContent>
          <form
            id="subscription-form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              label="العنوان"
              type="text"
              fullWidth
              variant="standard"
              value={newTitleBody.editTitle1}
              onChange={(event) => {
                setNewTitleBody({
                  ...newTitleBody,
                  editTitle1: event.target.value,
                });
              }}
            />

            <TextField
              required
              margin="dense"
              label="التفاصيل"
              type="text"
              fullWidth
              variant="standard"
              value={newTitleBody.editBody}
              onChange={(event) => {
                setNewTitleBody({
                  ...newTitleBody,
                  editBody: event.target.value,
                });
              }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            sx={{
              color: "red",
              fontSize: "20px",
            }}
            onClick={() => {
              setshowEditAlret(false);
            }}
          >
            الغاء
          </Button>

          <Button
            type="submit"
            form="subscription-form"
            sx={{
              color: "red",
              fontSize: "20px",
            }}
            onClick={() => {
              if (!deleteDialogTodo) return;

              dispatch({
                type: "edited",
                payload: {
                  id: deleteDialogTodo.id,
                  newTitle1: newTitleBody.editTitle1,
                  newBody1: newTitleBody.editBody,
                },
              });

              setshowEditAlret(false);

              showHideToast("تم التعديل بنجاح");
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main */}

      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 600,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              marginBottom: "0px",
              fontSize: {
                xs: "25px",
                md: "45px",
              },
            }}
          >
            مهامي
          </Typography>

          <hr />

          <ToggleButtonGroup
            onChange={changeValueTodos1}
            exclusive
            value={displayedTodosType}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <ToggleButton value="all">الكل</ToggleButton>

            <ToggleButton value="isCompeleted">منجز</ToggleButton>

            <ToggleButton value="isNotCompeleted">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          <div
            style={{
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            {todoss.map((todo) => (
              <ToDo
                key={todo.id}
                All={todo}
                showDelete1={showDelete}
                showedit1={showedit}
              />
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handelClickAddTOdo();
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                alignItems: "center",
                margin: "15px 25px",
              }}
            >
              <Grid size={8}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  label="عنوان المهمة"
                  variant="outlined"
                  value={newTodos}
                  onChange={(event) => {
                    setNewTodos(event.target.value);
                  }}
                />
              </Grid>

              <Grid size={4}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100%",
                    backgroundColor: "brown",
                    height: "50px",
                  }}
                  disabled={!newTodos.trim()}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}
