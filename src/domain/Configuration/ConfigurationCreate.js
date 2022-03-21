import * as React from "react";
import {
  Create,
  SimpleForm,
  SelectInput,
  TextInput,
  SaveButton,
  required,
  Toolbar,
  useRedirect,
} from "react-admin";
import { useLocation } from "react-router";
import APIS from "../../dataProvider/ApiEndpoint";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const ConfigurationCreate = (props) => {
  const location = useLocation();
  const redirect = useRedirect();

  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  if (!tokenAdmin) {
    return null;
  }

  const onSuccess = () => {
    redirect(`/${APIS.ACCOUNTS}/${location.state.record.id}/show/2`);
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data) => {
        return { ...data, tokenAdmin: tokenAdmin };
      }}
    >
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput validate={[required()]} source="configuration-name" />
        <SelectInput
          validate={[required()]}
          source="configuration"
          defaultValue="classifier"
          choices={[
            { id: "imageSearch", name: "imageSearch" },
            { id: "analysis", name: "analysis" },
            { id: "reducer", name: "reducer" },
            { id: "labelreader", name: "labelreader" },
            { id: "classifier", name: "classifier" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
