import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPiplinesByAccountToken } from "../../api/Pipline";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, TopToolbar } from "react-admin";
import AddIcon from "@material-ui/icons/Add";
import PiplineDelete from "./PiplineDelete";

const ShowActions = (props) => {
  return (
    <TopToolbar>
      <Button
        component={Link}
        to={{
          pathname: "/api/v1/pipelines/create",
          state: { record: props.record },
        }}
        label="Create Pipline"
      >
        <AddIcon />
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>id</TableCell>
              <TableCell>configuration-id</TableCell>
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
                  <TableCell>{pipline.nodes[0].configuration}</TableCell>
                  <TableCell align="right">
                    <PiplineDelete record={record} pipline={pipline} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {piplines && <ShowActions record={record} />}
    </>
  );
};
