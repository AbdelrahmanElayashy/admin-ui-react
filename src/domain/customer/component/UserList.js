// in src/users.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  ReferenceField,
} from "react-admin";

export const UserList = (props) => (
  <List
    {...props}
    hasEdit={false}
    title={"Customer Edit"}
    bulkActionButtons={false}
    exporter={false}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
);
