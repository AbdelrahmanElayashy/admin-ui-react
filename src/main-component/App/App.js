import * as React from "react";
import { Admin, Resource } from "react-admin";

import UserIcon from "@material-ui/icons/Group";
import Dashboard from "../MyAppBar/Dashboard";
import MyLayout from "../MyLayout/MyLayout";
import { initializePlatform } from "../../state/PlatformState";
import { createTheme } from "@material-ui/core/styles";
import SuperRestProvider from "../../dataProvider/SuperRestProvider";
import authProvider from "../../auth/authProvider";
import { ConfigurationCreate } from "../../domain/Configuration/ConfigurationCreate";
import PiplineCreate from "../../domain/Pipline/PiplineCreate";
import UserEdit from "../../domain/customer/UserEdit";
import UserList from "../../domain/customer/UserList";
import UserCreate from "../../domain/customer/UserCreate";
import UserShow from "../../domain/customer/UserShow";

const theme = createTheme({
  palette: {
    type: "light", // Switching the dark mode on is a single property value change.
  },
});

const App = () => {
  initializePlatform();

  return (
    <Admin
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
      />
    </Admin>
  );
};

export default App;
