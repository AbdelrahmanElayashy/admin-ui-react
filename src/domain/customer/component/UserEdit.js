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
  EmailField,
} from "react-admin";

export const UserEdit = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);
