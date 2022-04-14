import * as React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";
const UserCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="show">
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="email" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;