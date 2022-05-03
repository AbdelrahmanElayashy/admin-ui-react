import * as React from "react";
import { AppBar, Logout } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import TogglePlatform from "../TogglePlatform/TogglePlatform";
import ShowPlatform from "../TogglePlatform/ShowPlatform";
import MyUserMenu from "./MyUserMenu";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});

const MyAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar userMenu={<MyUserMenu />}>
      <span className={classes.spacer} />

      <ShowPlatform />
    </AppBar>
  );
};

export default MyAppBar;
