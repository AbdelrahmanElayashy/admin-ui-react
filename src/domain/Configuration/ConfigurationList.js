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
import { getConfigurationsByAccountToken } from "../../api/Configuration";
import AddIcon from "@mui/icons-material/Add";
import APIS from "../../dataProvider/ApiEndpoint";

import ConfigurationDelete from "./ConfigurationDelete";

const ShowActions = (props) => (
  <TopToolbar>
    <Button
      component={Link}
      to={{
        pathname: `/${APIS.CONFIGURATIONS}/create`,
        state: { record: props.record },
      }}
      label="Add Configuration"
    >
      <AddIcon />
    </Button>
  </TopToolbar>
);

export const ConfigurationList = (props) => {
  const { record } = useShowController();

  const { data, isLoading, error } = useGetList(`${APIS.CONFIGURATIONS}`, {
    meta: { tokenAdmin: record.tokenAdmin },
  });

  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <>
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
            {data &&
              data.map((configuration) => (
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
      {data && <ShowActions record={record} />}
    </>
  );
};
