// in src/users.js
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  ReferenceField,
  ShowButton,
  TextInput,
} from "react-admin";

const useStyles = makeStyles({
  headerCell: {
    backgroundColor: "#7cb342",
  },
});

const userFilters = [<TextInput label="Search By Name" source="q" alwaysOn />];

export const UserList = (props) => {
  const classes = useStyles();
  return (
    <List
      {...props}
      filters={userFilters}
      hasEdit={false}
      title={"Customer Edit"}
      bulkActionButtons={false}
      exporter={false}
    >
      <Datagrid classes={classes}>
        <TextField source="id" sortable={false} />
        <TextField source="name" sortable={false} />
        <EmailField source="email" sortable={false} />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};
