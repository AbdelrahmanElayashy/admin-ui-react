import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TogglePlatform from "../TogglePlatform/TogglePlatform";
import { Notification, useLogin, useNotify } from "react-admin";
import { initializePlatform } from "../../state/PlatformState";
import grow from "../../static/grow-avatar.png";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "20px auto",
};

const btnstyle = { margin: "10px 0" };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).catch(() => {
      notify("Invalid email or password");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar src={grow} alt="grow">
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            style={btnstyle}
            label="Email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={btnstyle}
            label="Password"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TogglePlatform style={btnstyle} />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
      <Notification />
    </form>
  );
};

export default Login;
