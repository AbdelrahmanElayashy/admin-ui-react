import * as React from "react";
import { AppBar, Logout, useLogout, UserMenu, useUserMenu } from "react-admin";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import ShowPlatform from "../TogglePlatform/ShowPlatform";
import LogoutIcon from "@mui/icons-material/Logout";

const MyLogoutButton = React.forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    <MenuItem onClick={handleClick} ref={ref}>
      <LogoutIcon /> <span style={{ marginLeft: "12px" }}>Logout</span>
    </MenuItem>
  );
});

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <MyLogoutButton />
  </UserMenu>
);

export default MyUserMenu;
