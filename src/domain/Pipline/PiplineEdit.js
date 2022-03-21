import { makeStyles } from "@mui/styles";
import * as React from "react";
import {
  Edit,
  useRecordContext,
  SimpleForm,
  SelectInput,
  TextInput,
  SaveButton,
  required,
  CheckboxGroupInput,
  Toolbar,
  useGetOne,
  useEditController,
  EditContextProvider,
  EditBase,
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

const CustomToolbar = (props) => {
  const classes = useStyles();
  return (
    <Toolbar {...props} classes={useStyles()}>
      <SaveButton />
      {/* <UserDelete record={props.record} /> */}
    </Toolbar>
  );
};

const PiplineEdit = (props) => {
  const [configList, setConfigList] = useState();
  const [piplineList, setPiplineList] = useState();
  const location = useLocation();

  console.log("location", location);

  const tokenAdmin =
    location.state && location.state.record
      ? location.state.record.tokenAdmin
      : undefined;

  // const { isLoading, data } = useGetOne(`${APIS.PIPELINES}`, {
  //   id: "6244d40bb4df3b260b77bb04",
  //   tokenAdmin: tokenAdmin,
  // });

  // const editContext = useEditController({
  //   resource: APIS.PIPELINES,
  //   record: props.pipline,
  // });

  const redirect = tokenAdmin
    ? `${APIS.ACCOUNTS}/${location.state.record.id}/show/1`
    : false;

  // const fetchAndUpdateConfigList = async () => {
  //   console.log(getTokenAdmin());
  //   const response = await getConfigurationsByAccountToken({ tokenAdmin });
  //   const data = await response.data.map((arrElement) => {
  //     return {
  //       id: arrElement.id,
  //       name: arrElement.name,
  //     };
  //   });
  //   setConfigList(data);
  // };

  // const fetchAndUpdatePiplineList = async () => {
  //   const response = await getPiplinesByAccountToken({ tokenAdmin });
  //   const data = await response.data;
  //   setPiplineList(data);
  // };

  useEffect(() => {
    // fetchAndUpdateConfigList();
    // fetchAndUpdatePiplineList();
  }, []);

  if (!tokenAdmin) {
    return null;
  }

  const transform = (data) => ({
    ...data,
    tokenAdmin: tokenAdmin,
  });

  return (
    // <EditContextProvider value={editContext} {...props}>
    <EditBase {...props} record={props.pipline} >
      <SimpleForm>
        <TextInput
          validate={[required()]}
          source="pipline-name"
          defaultValue=""
        />
        {/* {configList && (
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
        /> */}
      </SimpleForm>
    </EditBase>
  );
};
export default PiplineEdit;
