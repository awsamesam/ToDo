import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnackbarsProps = {
  open: boolean;
  title: string;
};

export default function CustomizedSnackbars({
  open,
  title,
}: SnackbarsProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{
          width: "100%",
        }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
}