import * as React from "react";
import {
  Create,
  SimpleForm,
  SelectInput,
  TextInput,
  SaveButton,
  required,
  CheckboxGroupInput,
  Toolbar,
  useRedirect,
  useGetList,
} from "react-admin";
import { useLocation } from "react-router";
import APIS from "../../dataProvider/ApiEndpoint";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const PiplineCreate = (props) => {
  const location = useLocation();
  const redirect = useRedirect();

  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  const { data: configList } = useGetList(`${APIS.CONFIGURATIONS}`, {
    meta: { tokenAdmin: tokenAdmin },
  });

  if (!tokenAdmin) {
    return null;
  }

  const onSuccess = () => {
    redirect(`/${APIS.ACCOUNTS}/${location.state.record.id}/show/1`);
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data) => ({ ...data, tokenAdmin: tokenAdmin })}
    >
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          validate={[required()]}
          source="pipline-name"
          defaultValue=""
        />

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
          source="configuration"
          choices={configList}
        />

        <SelectInput
          validate={[required()]}
          source="technology"
          defaultValue="objectclassifier"
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
          defaultValue="sdk"
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
