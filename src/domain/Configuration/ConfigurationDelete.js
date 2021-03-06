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

const ConfigurationDelete = (props) => {
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
  const configuration = props.configuration;

  if (!record) {
    return null;
  }
  const tokenAdmin = record.tokenAdmin;

  const handleDeleteConfirm = (configurationId) => {
    setOpen(false);
    console.log(configurationId);
    dataProvider
      .delete(APIS.CONFIGURATIONS, {
        data: {
          id: configurationId,
          tokenAdmin: record.tokenAdmin,
        },
      })
      .then(() => {
        refresh();
        notify(`Configuration is deleted`, { type: "info" });
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
          {`Delete Configuration ${configuration.name}`}
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
              const id = configuration.id;
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

export default ConfigurationDelete;
