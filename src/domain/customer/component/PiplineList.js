import { useEffect, useState } from "react";
import { getPiplinesByAccountToken } from "../../../api/Pipline";

export const PiplineList = (props) => {
  const [piplines, setPiplines] = useState([]);

  useEffect(() => {
    getPiplinesByAccountToken(props.record).then(setPiplines);
  }, []);

  const record = props.record;
  if (!record) {
    return null;
  }

  console.log(record);

  return (
    <div>
      {piplines.length &&
        piplines.map((pipline) => <div key={pipline.id}>{pipline.id}</div>)}
    </div>
  );
};
