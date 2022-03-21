import { getPlatformUrl } from "../state/PlatformState";
import APIS from "./ApiEndpoint";
import ConfigurationRestProvider from "./ConfigurationRestProvider";
import PiplineRestProvider from "./PiplineRestProvider";
import UserRestProvider from "./UserRestProvider";

const dataProviders = [
  {
    dataProvider: UserRestProvider(getPlatformUrl()),
    resources: [APIS.ACCOUNTS],
  },
  {
    dataProvider: ConfigurationRestProvider(getPlatformUrl()),
    resources: [APIS.CONFIGURATIONS],
  },
  {
    dataProvider: PiplineRestProvider(getPlatformUrl()),
    resources: [APIS.PIPELINES],
  },
];

export default (type, resource, params) => {
  const dataProviderMapping = dataProviders.find((dp) =>
    dp.resources.includes(resource)
  );

  return dataProviderMapping.dataProvider(type, resource, params);
};
