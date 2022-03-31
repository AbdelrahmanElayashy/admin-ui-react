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
import { forwardRef, useEffect, useState } from "react";
import { Button, CreateButton, Error, Link, TopToolbar } from "react-admin";
import { getConfigurationsByAccountToken } from "../../api/Configuration";
import AddIcon from "@material-ui/icons/Add";

import ConfigurationDelete from "./ConfigurationDelete";

const ShowActions = (props) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: "/api/v1/configurations/create",
        state: { record: props.record },
      }}
      label=""
    >
      <AddIcon />
    </Button>
  </TopToolbar>
);

export const ConfigurationList = (props) => {
  const [config, setConfig] = useState([]);
  const [result, setResult] = useState(false);

  useEffect(() => {
    getConfigurationsByAccountToken(props.record).then((e) =>
      setConfig(e.data)
    );
  }, []);

  const record = props.record;
  if (!record) {
    return null;
  }

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
                    <ConfigurationDelete
                      record={record}
                      configuration={configuration}
                    />
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
