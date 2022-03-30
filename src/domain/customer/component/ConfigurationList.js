import {
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
import ButtonMui from "@mui/material/Button";
import { forwardRef, useEffect, useState } from "react";
import {
  Button,
  CreateButton,
  Error,
  Link,
  Loading,
  Show,
  SimpleForm,
  TopToolbar,
  useDataProvider,
  useDelete,
} from "react-admin";
import { getConfigurationsByAccountToken } from "../../../api/Configuration";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const ShowActions = forwardRef((record, ref) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: "/api/v1/configurations/create",
        state: { record: record },
      }}
      label="Create configuration"
    >
      <AddIcon />
    </Button>
  </TopToolbar>
));

export const ConfigurationList = (props) => {
  const [config, setConfig] = useState([]);
  const [result, setResult] = useState(false);
  const [open, setOpen] = useState(false);
  const dataProvider = useDataProvider();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getConfigurationsByAccountToken(props.record).then((e) =>
      setConfig(e.data)
    );
  }, []);

  const record = props.record;
  if (!record) {
    return null;
  }

  const handleDeleteConfirm = (configurationId) => {
    setOpen(false);
    console.log(configurationId);
    dataProvider
      .delete("api/v1/configurations", {
        data: {
          id: configurationId,
          tokenAdmin: record.tokenAdmin,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  //   if (loading) return <Loading />;
  //   if (error) return <Error />;

  return (
    <>
      {/* <ShowActions /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>id</TableCell>
              <TableCell>type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {config &&
              config.map((configuration) => (
                <TableRow
                  key={configuration.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {configuration.name}
                  </TableCell>
                  <TableCell>{configuration.id}</TableCell>
                  <TableCell>{configuration.type}</TableCell>
                  <TableCell align="right">
                    <ButtonMui
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleClickOpen}
                    >
                      Delete
                    </ButtonMui>
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
                        <ButtonMui onClick={handleClose}>Cancel</ButtonMui>
                        <ButtonMui
                          onClick={() => {
                            const id = configuration.id;
                            handleDeleteConfirm(id);
                          }}
                          autoFocus
                        >
                          Confirm
                        </ButtonMui>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {config && <ShowActions record={record} />}
    </>
  );
};
