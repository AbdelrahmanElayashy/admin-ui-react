import { makeStyles } from "@mui/styles";
import * as React from "react";
import {
  SimpleForm,
  TextInput,
  SaveButton,
  required,
  Toolbar,
  EditBase,
  SelectInput,
  useGetList,
  EditContextProvider,
  useEditController,
  CheckboxGroupInput,
  useUpdate,
  useRedirect,
} from "react-admin";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getConfigurationsByAccountToken } from "../../api/Configuration";
import APIS from "../../dataProvider/ApiEndpoint";
import { getPiplinesByAccountToken } from "../../api/Pipline";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const MyToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton type="button" />
  </Toolbar>
);

const PiplineEdit = (props) => {
  const [update, { isLoading }] = useUpdate();
  const location = useLocation();
  const redirect = useRedirect();

  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  const pipline = location.state ? location.state.pipline : undefined;

  const onSubmit = (data) => {
    const node = [];
    node[0] = {
      ...pipline.nodes[0],
      identifier: data.identifier,
      descriptor: data.descriptor,
    };
    const transformedData = {
      name: data.name,
      nodes: node,
    };

    console.log("tra", transformedData);
    update(
      APIS.PIPELINES,
      { id: pipline.id, data: { ...transformedData, tokenAdmin: tokenAdmin } },
      {
        onSuccess: () => {
          redirect(`/${APIS.ACCOUNTS}/${location.state.record.id}/show/1`);
        },
      }
    );
  };

  if (!tokenAdmin || !pipline) {
    return null;
  }

  return (
    <EditContextProvider
      value={{
        record: pipline,
        save: onSubmit,
        saving: isLoading,
      }}
    >
      <SimpleForm toolbar={<MyToolbar />}>
        <TextInput validate={[required()]} source="name" />

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
      </SimpleForm>
    </EditContextProvider>
  );
};
export default PiplineEdit;
