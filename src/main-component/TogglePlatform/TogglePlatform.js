import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import {
  isProductionPlatform,
  updatePlatformUrl,
  updateProductionPlatform,
} from "../../state/PlatformState";

const TogglePlatform = (props) => {
  // const refresh = useRefresh();
  const [productionPlatformChecked, setProductionPlatformChecked] = useState(
    () => {
      const val = isProductionPlatform();
      return val;
    }
  );

  // useEffect(() => {
  //   window.location.reload();
  // }, [productionPlatformChecked]);

  const handlePlatformChange = (e) => {
    const isProducktionPlatform = e.target.checked;
    updatePlatformUrl(isProducktionPlatform);
    updateProductionPlatform(isProducktionPlatform);
    window.location.reload();
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
