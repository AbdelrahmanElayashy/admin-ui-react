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
  CheckboxGroupInput,
  TopToolbar,
  Toolbar,
} from "react-admin";
import { useLocation } from "react-router";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const PiplineCreate = (props) => {
  const location = useLocation();
  console.log(location);
  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  const redirect = tokenAdmin
    ? `/api/v1/accounts/${location.state.record.id}/show/1`
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
        <TextInput
          validate={[required()]}
          source="pipline-name"
          defaultValue=""
        />
        <TextInput validate={[required()]} source="configuration-id" />
        <TextInput
          validate={[required()]}
          source="identifier"
          defaultValue="queueName"
        />
        <TextInput
          validate={[required()]}
          source="descriptor"
          defaultValue="descriptor"
        />

        <SelectInput
          validate={[required()]}
          source="technology"
          choices={[
            { id: "objectclassifier", name: "objectclassifier" },
            { id: "labelreader", name: "labelreader" },
            { id: "photoocr", name: "photoocr" },
            { id: "imagesearch", name: "imagesearch" },
            { id: "analysis", name: "analysis" },
            { id: "opticalcode", name: "opticalcode" },
            { id: "reducer", name: "reducer" },
          ]}
        />
        <SelectInput
          validate={[required()]}
          source="platform"
          choices={[
            { id: "sdk", name: "sdk" },
            { id: "cloud", name: "cloud" },
          ]}
        />

        <CheckboxGroupInput
          validate={[required()]}
          source="inputTypes"
          choices={[
            { id: "image", name: "image" },
            { id: "json", name: "json" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};

export default PiplineCreate;
