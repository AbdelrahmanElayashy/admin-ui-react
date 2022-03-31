import * as React from "react";
import {
  Create,
  SimpleForm,
  SelectInput,
  TextInput,
  SaveButton,
  required,
  Toolbar,
} from "react-admin";
import { useLocation } from "react-router";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const ConfigurationCreate = (props) => {
  const location = useLocation();
  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  const redirect = tokenAdmin
    ? `/api/v1/accounts/${location.state.record.id}/show/2`
    : false;

  if (!tokenAdmin) {
    return null;
  }

  return (
    <Create
      {...props}
      transform={(data) => ({ ...data, tokenAdmin: tokenAdmin })}
    >
      <SimpleForm redirect={redirect} toolbar={<CustomToolbar />}>
        <TextInput validate={[required()]} source="configuration-name" />
        <SelectInput
          validate={[required()]}
          source="configuration"
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
