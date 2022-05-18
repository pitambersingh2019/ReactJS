import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

function getBaseUrl() {
  const UrlStorage = window.sessionStorage.getItem("ngStorage-baseUrl");
  const Urlobj = UrlStorage ? JSON.parse(UrlStorage) : null;

  return Urlobj;
}

function getAcessToken() {
  const userAuthTokenStorage = window.sessionStorage.getItem(
    "ngStorage-userAuthenticated"
  );
  const userAuthobj = userAuthTokenStorage
    ? JSON.parse(userAuthTokenStorage)
    : null;

  return userAuthobj?.accessToken;
}

api.interceptors.request.use(function (config) {
  config.baseURL = getBaseUrl();
  config.headers["x-access-token"] = getAcessToken();
  return config;
});
