import { Reorder } from "@mui/icons-material";
import * as React from "react";
import {
  Show,
  TextField,
  Tab,
  TabbedShowLayout,
  useRecordContext,
  EmailField,
  TopToolbar,
  useShowContext,
} from "react-admin";
import { ConfigurationList } from "../configuration/ConfigurationList";
import { PiplineList } from "../pipline/PiplineList";
import UserStatistic from "../statistic/UserStatistic";

// const ShowActions = ({ basePath, data, resource }) => {
//   return <TopToolbar></TopToolbar>;
// };
const UserShow = (props) => {


  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="master" />
          <TextField source="salt" />
          <TextField source="tokenAdmin" />
          <TextField source="tokenRecognition" />
        </Tab>
        <Tab label="Pipline">
          <PiplineList />
        </Tab>
        <Tab label="Configuration">
          <ConfigurationList />
        </Tab>
        {/* <Tab label="statistics">
          <UserStatistic/>
        </Tab> */}
      </TabbedShowLayout>
    </Show>
  );
};

export default UserShow;
