import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Link,
  TopToolbar,
  useGetList,
  useShowController,
} from "react-admin";
import AddIcon from "@mui/icons-material/Add";
import PiplineDelete from "./PiplineDelete";
import APIS from "../../dataProvider/ApiEndpoint";
import EditIcon from "@mui/icons-material/Edit";
import { PiplineTest } from "./PiplineTest";

const ShowActions = (props) => {
  return (
    <TopToolbar>
      <Button
        component={Link}
        to={{
          pathname: `/${APIS.PIPELINES}/create`,
          state: { record: props.record },
        }}
        label=""
      >
        <AddIcon />
        Add Pipline
      </Button>
    </TopToolbar>
  );
};

export const PiplineList = (props) => {
  const { record } = useShowController(); // user record
  const [open, setOpen] = useState(false);

  const { data: piplines } = useGetList(`${APIS.PIPELINES}`, {
    meta: { tokenAdmin: record.tokenAdmin },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>id</TableCell>
              <TableCell>identifier</TableCell>
              <TableCell>configuration-id</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
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
                  <TableCell>{pipline.nodes[0].identifier}</TableCell>
                  <TableCell>{pipline.nodes[0].configuration}</TableCell>
                  <TableCell align="right">
                    <PiplineTest
                      piplineId={pipline.id}
                      tokenRecognition={record.tokenRecognition}
                      piplineName={pipline.name}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      to={{
                        pathname: `/${APIS.PIPELINES}/${pipline.id}`,
                        state: { record: record, pipline: pipline },
                      }}
                      label="Edit"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>

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
