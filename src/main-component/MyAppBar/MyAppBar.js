import * as React from "react";
import { AppBar } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import TogglePlatform from "../TogglePlatform/TogglePlatform";

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
    <AppBar>
      <span className={classes.spacer} />
      <TogglePlatform />
    </AppBar>
  );
};

export default MyAppBar;
