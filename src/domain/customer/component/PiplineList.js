import { useEffect, useState } from "react";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPiplinesByAccountToken } from "../../../api/Pipline";
import DeleteIcon from "@material-ui/icons/Delete";
import { TopToolbar } from "react-admin";
import AddIcon from "@material-ui/icons/Add";

const ShowActions = () => {
  return (
    <TopToolbar>
      <Button variant="outlined" startIcon={<AddIcon />} color="primary">
        New Pipline
      </Button>
    </TopToolbar>
  );
};

export const PiplineList = (props) => {
  const [piplines, setPiplines] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPiplinesByAccountToken(props.record).then((e) => setPiplines(e.data));
  }, []);

  const record = props.record;
  if (!record) {
    return null;
  }

  console.log(record);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>id</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {piplines &&
              piplines.map((pipline) => (
                <TableRow
                  key={pipline.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {pipline.name}
                  </TableCell>
                  <TableCell>{pipline.id}</TableCell>
                  <TableCell align="right">
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
                        {`Delete pipline ${pipline.name}`}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this item?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowActions />
    </>
  );
};
