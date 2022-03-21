import APIS from "../dataProvider/ApiEndpoint";
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

export async function getPiplineRecognitionStatusWithCallback(
  { piplineId, tokenRecognition, recognitionId },
  callback
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenRecognition);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const url =
    getPlatformUrl() +
    `/${APIS.PIPELINES}/${piplineId}/recognitions/${recognitionId}`;
  return fetch(url, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error();
      }
      return response.text();
    })
    .then((response) => JSON.parse(response))
    .then((response) => callback(response));
}

export async function getTestPiplineRegonitionId(piplineId, tokenRecognition) {
  const url = getPlatformUrl() + `/${APIS.PIPELINES}/${piplineId}/recognitions`;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenRecognition);

  var formdata = new FormData();
  var file = await fetchImageForTest();
  await formdata.append("image", file, "[PROXY]");

  var requestOptions = await {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(url, requestOptions)
    .then((response) => {
      if (response.status !== 201) {
        throw new Error();
      }
      return response.text();
    })
    .then((result) => JSON.parse(result));
}

const fetchImageForTest = async () => {
  const response = await fetch(
    "https://appcustomizer.blob.core.windows.net/supergraphic/Chrysanthemum.jpg"
  );
  // here image is url/location of image
  const blob = await response.blob();
  return await new File([blob], "image.jpg", { type: blob.type });
};
