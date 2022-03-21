import { useState, useEffect } from "react";
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
  useDataProvider,
} from "react-admin";
import { useLocation } from "react-router";
import { getConfigurationsByAccountToken } from "../../api/Configuration";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const PiplineCreate = (props) => {
  const [configList, setConfigList] = useState();
  const dataProvider = useDataProvider();
  const location = useLocation();

  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  const redirect = tokenAdmin
    ? `/api/v1/accounts/${location.state.record.id}/show/1`
    : false;

  const fetchAndUpdateConfigList = async () => {
    const response = await getConfigurationsByAccountToken({ tokenAdmin });
    const data = await response.data.map((arrElement) => {
      return {
        id: arrElement.id,
        name: arrElement.name,
      };
    });
    setConfigList(data);
  };

  useEffect(() => {
    fetchAndUpdateConfigList();
  }, []);

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
        {configList && (
          <SelectInput
            validate={[required()]}
            source="configuration"
            defaultValue="Default Configuration"
            choices={configList}
          />
        )}
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
