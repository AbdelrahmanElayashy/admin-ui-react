import { getPlatformUrl } from "../state/PlatformState";
import ConfigurationRestProvider from "./ConfigurationRestProvider";
import PiplineRestProvider from "./PiplineRestProvider";
import UserRestProvider from "./UserRestProvider";

const dataProviders = [
  {
    dataProvider: UserRestProvider(getPlatformUrl()),
    resources: ["api/v1/accounts"],
  },
  {
    dataProvider: ConfigurationRestProvider(getPlatformUrl()),
    resources: ["api/v1/configurations"],
  },
  {
    dataProvider: PiplineRestProvider(getPlatformUrl()),
    resources: ["api/v1/pipelines"],
  },
];

export default (type, resource, params) => {
  const dataProviderMapping = dataProviders.find((dp) =>
    dp.resources.includes(resource)
  );

  return dataProviderMapping.dataProvider(type, resource, params);
};
