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
import { useEffect, useState } from "react";
import { Show, SimpleForm, TopToolbar } from "react-admin";
import { getConfigurationsByAccountToken } from "../../../api/Configuration";

const ShowActions = () => {
  return <TopToolbar></TopToolbar>;
};

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

  console.log(config, "config");
  console.log(result, "result");

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
            </TableRow>
          </TableHead>
          <TableBody>
            {config &&
              config.map((configuration) => (
                <TableRow
                  key={configuration.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {configuration.name}
                  </TableCell>
                  <TableCell>{configuration.id}</TableCell>
                  <TableCell>{configuration.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
