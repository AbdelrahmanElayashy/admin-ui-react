import { getPlatformUrl } from "../state/PlatformState";

export function getPiplinesByAccountToken({ tokenAdmin }) {
  const url = getPlatformUrl() + "/api/v1/pipelines";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenAdmin);
  myHeaders.append("debug", "ON");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
