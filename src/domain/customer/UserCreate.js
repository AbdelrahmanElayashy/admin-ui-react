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
import APIS from "../../dataProvider/ApiEndpoint";

const UserCreate = (props) => {
  const dataProvider = useDataProvider();
  const redirect = useRedirect();

  const redirectToShow = async (id) => {
    redirect(`/${APIS.ACCOUNTS}/${id}/show`);
  };

  const save = async (response) => {
    const resp = await dataProvider.getOne(APIS.ACCOUNTS, {
      id: response.id,
    });

    await dataProvider.create(APIS.CONFIGURATIONS, {
      data: {
        ["configuration-name"]: "Default Configuration",
        configuration: "classifier",
        tokenAdmin: resp.data.tokenAdmin,
      },
    });

    await redirectToShow(response.id);
  };

  return (
    <Create mutationOptions={{ onSuccess: save }}>
      <SimpleForm redirect="show">
        <TextInput validate={[required()]} source="name" />
        <TextInput validate={[required()]} source="email" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
