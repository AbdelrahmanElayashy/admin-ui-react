import * as React from "react";
import {
  Create,
  SimpleForm,
  Toolbar,
  TextInput,
  required,
  useRedirect,
  useNotify,
  SaveButton,
  useCreate,
  useDataProvider,
} from "react-admin";

const UserCreate = (props) => {
  const dataProvider = useDataProvider();

  const save = async (response) => {
    const resp = await dataProvider.getOne("api/v1/accounts", {
      id: response.data.id,
    });

    await dataProvider.create("api/v1/configurations", {
      data: {
        ["configuration-name"]: "Default Configuration",
        configuration: "classifier",
        tokenAdmin: resp.data.tokenAdmin,
      },
    });
  };

  return (
    <Create {...props} onSuccess={save}>
      <SimpleForm>
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="email" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
