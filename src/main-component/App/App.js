import * as React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { UserList } from "../../domain/customer/component/UserList";
import { UserEdit } from "../../domain/customer/component/UserEdit";
import { UserCreate } from "../../domain/customer/component/UserCreate";
import UserIcon from "@material-ui/icons/Group";
import Dashboard from "../MyAppBar/Dashboard";
import MyLayout from "../MyLayout/MyLayout";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dashboard={Dashboard} layout={MyLayout} dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={UserIcon}
    />
  </Admin>
);

export default App;
