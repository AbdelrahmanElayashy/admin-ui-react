import { getPlatformUrl } from "../state/PlatformState";

export function getPiplinesByAccountToken({ tokenAdmin }) {
  const url = getPlatformUrl() + "/api/v1/pipelines";
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
