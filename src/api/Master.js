import { getPlatformUrl } from "../state/PlatformState";

const urlMaster = getPlatformUrl() + "/api/v1/masters";

export async function getMasterIdByAdminToken(tokenAdmin) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenAdmin);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(urlMaster, requestOptions)
    .then((result) => {
      return result.text();
    })
    .catch((error) => console.log("error", error));
}

export async function getMasterTokenById({ masterId, tokenAdmin }) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", tokenAdmin);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${urlMaster}/${masterId}`, requestOptions).then((response) =>
    response.text()
  );
}
