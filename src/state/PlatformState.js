/**
 * The default value of platform state is Test platform.
 *  The state of platform is stored in localStorage.
 *
 */

export function getPlatformUrl() {
  return localStorage.getItem("urlPlatform");
}

export function initializePlatform() {
  if (localStorage.getItem("urlPlatform") === null) {
    localStorage.setItem(
      "urlPlatform",
      process.env.REACT_APP_URL_TEST_PLATFORM
    );
    localStorage.setItem("productionPlatformChecked", false);
  }
}

export function isProductionPlatform() {
  return JSON.parse(localStorage.getItem("productionPlatformChecked"));
}

export function updatePlatformUrl(isProductionPlatform) {
  if (isProductionPlatform) {
    localStorage.setItem(
      "urlPlatform",
      process.env.REACT_APP_URL_PRODUCTION_PLATFORM
    );
  } else {
    localStorage.setItem(
      "urlPlatform",
      process.env.REACT_APP_URL_TEST_PLATFORM
    );
  }
}

export function updateProductionPlatform(isProductionPlatform) {
  localStorage.setItem("productionPlatformChecked", isProductionPlatform);
}
