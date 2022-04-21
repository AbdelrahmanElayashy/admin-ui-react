import { makeStyles } from "@material-ui/core/styles";
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

const TogglePlatform = (props) => {
  const classes = useStyles();
  const [productionPlatformChecked, setProductionPlatformChecked] = useState(
    () => {
      const val = isProductionPlatform();
      return val;
    }
  );

  const handlePlatformChange = (e) => {
    // if toggle platform is disabled then return and don't do any changes to platform
    if (props.disabled) {
      return;
    }
    const isProducktionPlatform = e.target.checked;
    updateProductionPlatform(isProducktionPlatform);
    updatePlatformUrlAndReloadWindow(isProducktionPlatform);
  };
  return (
    <FormControlLabel
      {...props}
      className={classes.root}
      control={<Switch color="info" />}
      label="Production"
      onClick={handlePlatformChange}
      checked={productionPlatformChecked}
    />
  );
};

export default TogglePlatform;
