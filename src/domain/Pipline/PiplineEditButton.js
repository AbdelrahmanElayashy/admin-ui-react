import * as React from "react";
import { Button } from "@mui/material";
import { Link } from "react-admin";
import APIS from "../../dataProvider/ApiEndpoint";

const PiplineEditButton = (props) => {
  return (
    <Button
      component={Link}
      to={{
        pathname: `/${APIS.PIPELINES}/${props.piplineId}`,
      }}
      label="Edite Pipline"
    ></Button>
  );
};

export default PiplineEditButton;
