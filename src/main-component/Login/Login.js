import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TogglePlatform from "../TogglePlatform/TogglePlatform";
import { Notification, useLogin, useNotify } from "react-admin";
import { initializePlatform } from "../../state/PlatformState";
import grow from "../../static/grow-avatar.png";
import { CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }).catch(() => {
      setLoading(false);
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
          {loading ? (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
          )}
        </Paper>
      </Grid>
      <Notification />
    </form>
  );
};

export default Login;
