import { initializeMasterToken } from "../state/TokensState";

const authProvider = {
  login: ({ username, password }) => {
    const url = process.env.REACT_APP_API_ADMIN_LOGIN;
    console.log(url);
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
        initializeMasterToken();
      })
      .catch(() => {
        throw new Error("Invalid email or password");
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({ redirectTo: "/unauthorized", logoutUser: false });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    // Required for the authentication to work
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("tokenMaster");
    return Promise.resolve();
  },
};

export default authProvider;
