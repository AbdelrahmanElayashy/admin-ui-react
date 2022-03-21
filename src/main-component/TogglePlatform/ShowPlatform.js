import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import {
  isProductionPlatform,
  updatePlatformUrlAndReloadWindow,
  updateProductionPlatform,
} from "../../state/PlatformState";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    color: "rgba(0, 0, 0, 0.54)",
    paddingRight: "10px",
  },
});

const ShowPlatform = (props) => {
  const classes = useStyles();
  const [productionPlatformChecked, setProductionPlatformChecked] = useState(
    () => {
      const val = isProductionPlatform();
      return val;
    }
  );

  const getCurrentPlatform = () => {
    if (productionPlatformChecked) {
      return "Production Platform";
    }

    return "Test Platform";
  };

  return <span {...props}>{getCurrentPlatform()}</span>;
};

export default ShowPlatform;
