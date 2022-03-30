import * as React from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  SaveButton,
  useMutation,
  required,
} from "react-admin";
import { useLocation } from "react-router";

export const ConfigurationCreate = (props) => {
  const location = useLocation();
  console.log(location);
  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.record.tokenAdmin
      : undefined;

  const redirect = tokenAdmin
    ? `/api/v1/accounts/${location.state.record.record.id}/show/2`
    : false;

  console.log(tokenAdmin);
  return (
    <Create
      {...props}
      transform={(data) => ({ ...data, tokenAdmin: tokenAdmin })}
    >
      <SimpleForm redirect={redirect}>
        <TextInput validate={[required()]} source="name" />
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
