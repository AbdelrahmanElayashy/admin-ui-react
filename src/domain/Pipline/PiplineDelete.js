import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDataProvider, useNotify, useRefresh } from "react-admin";
import DeleteIcon from "@mui/icons-material/Delete";
import APIS from "../../dataProvider/ApiEndpoint";

const PiplineDelete = (props) => {
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();
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
      .delete(APIS.PIPELINES, {
        data: {
          id: piplineId,
          tokenAdmin: record.tokenAdmin,
        },
      })
      .then(() => {
        refresh();
        notify(`Pipline is deleted`, { type: "info" });
      })
      .catch((error) => {
        refresh();
        notify(`${error}`, { type: "warning" });
      });
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
