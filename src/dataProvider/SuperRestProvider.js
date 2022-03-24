import { getPlatformUrl } from "../state/PlatformState";
import UserRestProvider from "./UserRestProvider";

const dataProviders = [
  {
    dataProvider: UserRestProvider(getPlatformUrl()),
    resources: ["api/v1/accounts"],
  },
];

export default (type, resource, params) => {
  const dataProviderMapping = dataProviders.find((dp) =>
    dp.resources.includes(resource)
  );

  return dataProviderMapping.dataProvider(type, resource, params);
};
