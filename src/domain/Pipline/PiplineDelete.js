import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDataProvider } from "react-admin";
import DeleteIcon from "@material-ui/icons/Delete";

const PiplineDelete = (props) => {
  const [open, setOpen] = useState(false);
  const dataProvider = useDataProvider();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const record = props.record;
  const pipline = props.pipline;

  if (!record) {
    return null;
  }
  const tokenAdmin = record.tokenAdmin;

  const handleDeleteConfirm = (piplineId) => {
    setOpen(false);
    console.log(piplineId);
    dataProvider
      .delete("api/v1/pipelines", {
        data: {
          id: piplineId,
          tokenAdmin: record.tokenAdmin,
        },
      })
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <>
      <Button
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete Configuration ${pipline.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              const id = pipline.id;
              handleDeleteConfirm(id);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PiplineDelete;
