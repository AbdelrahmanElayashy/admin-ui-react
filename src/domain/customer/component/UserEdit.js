import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

export const UserEdit = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="body" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);
