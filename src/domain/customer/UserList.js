import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  ShowButton,
  TextInput,
  CreateButton,
} from "react-admin";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});

const ListActions = () => {
  const classes = useStyles();
  return (
    <>
      <span className={classes.spacer} />
      <CreateButton />
    </>
  );
};

const userFilters = [<TextInput label="Search By Name" source="q" alwaysOn />];
const UserList = (props) => {
  return (
    <List
      {...props}
      filters={userFilters}
      title={"Customer Edit"}
      exporter={false}
      actions={<ListActions />}
    >
      <Datagrid bulkActionButtons={false}>
        {/* <TextField source="id" sortable={false} /> */}
        <TextField source="name" sortable={false} />
        <EmailField source="email" sortable={false} />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
