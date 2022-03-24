import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export const UserEdit = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);
