import { getPlatformUrl } from "../state/PlatformState";

export function getConfigurationsByAccountToken({ tokenAdmin }) {
  const url = getPlatformUrl() + "/api/v1/configurations";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenAdmin);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => JSON.parse(error));
}
