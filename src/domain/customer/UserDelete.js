import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDataProvider, useNotify, useRedirect } from "react-admin";
import DeleteIcon from "@mui/icons-material/Delete";
import { getConfigurationsByAccountToken } from "../../api/Configuration";
import { getPiplinesByAccountToken } from "../../api/Pipline";
import APIS from "../../dataProvider/ApiEndpoint";

const UserDelete = (props) => {
  const [open, setOpen] = useState(false);
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const notify = useNotify();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const record = props.record;

  if (!record) {
    return null;
  }
  const tokenAdmin = record.tokenAdmin;

  const handleDeleteConfirm = async (userId) => {
    setOpen(false);
    const configurations = await getConfigurationsByAccountToken({
      tokenAdmin,
    });
    const piplines = await getPiplinesByAccountToken({ tokenAdmin });

    if (!piplines.data.length && !configurations.data.length) {
      dataProvider
        .delete(APIS.ACCOUNTS, {
          data: {
            id: userId,
            tokenAdmin: record.tokenAdmin,
          },
        })
        .then((e) => {
          notify(`User is deleted`, { type: "info" });
          redirect(`/${APIS.ACCOUNTS}`);
        })
        .catch((error) => {
          notify(`User is not deleted`, { type: "warning" });
        });
    } else {
      notify(`Delete all piplines & configurations first`, { type: "warning" });
    }
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
          {`Delete account ${record.name}`}
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
              const id = record.id;
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

export default UserDelete;
