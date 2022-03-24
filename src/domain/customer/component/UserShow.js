import { Divider } from "@mui/material";
import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  Tab,
  TabbedShowLayout,
  useRecordContext,
  EmailField,
} from "react-admin";
import UserStatistic from "./UserStatistic";

export const UserShow = (props) => {
  const record = useRecordContext();

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="master" />
          <TextField source="salt" />
          {/* <TextField source="tokenAdmin" />
          <TextField source="tokenRecognition" /> */}
        </Tab>
        <Tab label="statistics">
          <UserStatistic record={record} />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
