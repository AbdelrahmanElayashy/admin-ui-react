import * as React from "react";
import { Admin, Resource } from "react-admin";

import UserIcon from "@mui/icons-material/Group";
import Dashboard from "../MyAppBar/Dashboard";
import MyLayout from "../MyLayout/MyLayout";
import { initializePlatform } from "../../state/PlatformState";
import { createTheme } from "@mui/material/styles";
import SuperRestProvider from "../../dataProvider/SuperRestProvider";
import authProvider from "../../auth/authProvider";
import { ConfigurationCreate } from "../../domain/configuration/ConfigurationCreate";
import PiplineCreate from "../../domain/pipline/PiplineCreate";
import UserEdit from "../../domain/customer/UserEdit";
import UserList from "../../domain/customer/UserList";
import UserCreate from "../../domain/customer/UserCreate";
import UserShow from "../../domain/customer/UserShow";
import Login from "../Login/Login";
import PiplineEdit from "../../domain/pipline/PiplineEdit";

const theme = createTheme({
  palette: {
    type: "light", // Switching the dark mode on is a single property value change.
  },
});

const App = () => {
  initializePlatform();

  return (
    <Admin
      loginPage={Login}
      theme={theme}
      dashboard={Dashboard}
      layout={MyLayout}
      dataProvider={SuperRestProvider}
      authProvider={authProvider}
      disableTelemetry
    >
      <Resource
        name="api/v1/accounts"
        options={{ label: "Accounts" }}
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={UserIcon}
        show={UserShow}
      />
      <Resource
        name="api/v1/configurations"
        options={{ label: "Configurations" }}
        create={ConfigurationCreate}
      />
      <Resource
        name="api/v1/pipelines"
        options={{ label: "Pipelines" }}
        create={PiplineCreate}
        edit={PiplineEdit}
      />
    </Admin>
  );
};

export default App;
