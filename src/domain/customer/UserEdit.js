import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import {
  DeleteButton,
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import UserDelete from "./UserDelete";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const CustomToolbar = (props) => {
  const classes = useStyles();
  return (
    <Toolbar {...props} classes={useStyles()}>
      <SaveButton />
      <UserDelete record={props.record} />
    </Toolbar>
  );
};

const UserEdit = (props) => {
  const record = useRecordContext();

  return (
    <Edit {...props} undoable={false}>
      <SimpleForm toolbar={<CustomToolbar record={record} />}>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );
};
export default UserEdit;
