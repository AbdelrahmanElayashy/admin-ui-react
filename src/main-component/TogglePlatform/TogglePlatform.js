import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import {
  isProductionPlatform,
  updatePlatformUrlAndReloadWindow,
  updateProductionPlatform,
} from "../../state/PlatformState";

const TogglePlatform = (props) => {
  const [productionPlatformChecked, setProductionPlatformChecked] = useState(
    () => {
      const val = isProductionPlatform();
      return val;
    }
  );

  const handlePlatformChange = (e) => {
    const isProducktionPlatform = e.target.checked;
    updateProductionPlatform(isProducktionPlatform);
    updatePlatformUrlAndReloadWindow(isProducktionPlatform);
  };
  return (
    <FormControlLabel
      {...props}
      control={<Switch color="info" />}
      label="production"
      onClick={handlePlatformChange}
      checked={productionPlatformChecked}
    />
  );
};

export default TogglePlatform;
