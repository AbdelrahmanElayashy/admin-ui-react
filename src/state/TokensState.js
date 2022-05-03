import { getMasterIdByAdminToken, getMasterTokenById } from "../api/Master";

function getSuperAdminToken() {
  return JSON.parse(localStorage.getItem("auth")).token;
}

export async function initializeMasterToken() {
  const tokenAdmin = getSuperAdminToken();
  const response = await getMasterIdByAdminToken(tokenAdmin);
  const masterId = JSON.parse(response).data[0].id; //Fetch the first master in data array!!
  return await getMasterTokenById({ masterId, tokenAdmin }).then((result) =>
    localStorage.setItem("tokenMaster", JSON.parse(result).tokenMaster)
  );
}

export function getMasterToken() {
  return localStorage.getItem("tokenMaster");
}
