import * as React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, fetchUtils, Resource } from "react-admin";
import { UserList } from "../../domain/customer/component/UserList";
import { UserEdit } from "../../domain/customer/component/UserEdit";
import { UserCreate } from "../../domain/customer/component/UserCreate";
import UserIcon from "@material-ui/icons/Group";
import Dashboard from "../MyAppBar/Dashboard";
import MyLayout from "../MyLayout/MyLayout";
import { UserShow } from "../../domain/customer/component/UserShow";
import { getPlatformUrl, initializePlatform } from "../../state/PlatformState";
import { createTheme } from "@material-ui/core/styles";
import UserRestProvider from "../../dataProvider/UserRestProvider";
import SuperRestProvider from "../../dataProvider/SuperRestProvider";

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
    </Admin>
  );
};

export default App;
