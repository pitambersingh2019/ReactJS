import { notifyPromiseToast } from "../Component/Toast/ToastContainer";
import { PromiseToastInterface } from "../Component/Toast/type";
import axios from "axios";

export function getBaseUrl() {
  const UrlStorage = window.sessionStorage.getItem("ngStorage-baseUrl");
  const Urlobj = UrlStorage ? JSON.parse(UrlStorage) : null;

  return Urlobj;
}

// export const api = axios.create({
//   baseURL: getBaseUrl(),
//   headers: {
//     "Content-type": "application/json",
//   },
// });

function getAcessToken() {
  const userAuthTokenStorage = window.sessionStorage.getItem(
    "ngStorage-userAuthenticated"
  );
  const userAuthobj = userAuthTokenStorage
    ? JSON.parse(userAuthTokenStorage)
    : null;

  return userAuthobj?.accessToken;
}

// api.interceptors.request.use(function (config) {
//   const token = getAcessToken();
//   config.headers["x-access-token"] = token;
//   return config;
// });

export function ToastapiCall(
  Details: PromiseToastInterface,
  requestURL: string,
  method: string,
  params: object,
  onClose?: () => void
) {
  const promise = new Promise((resolve) =>
    resolve(apiCall(requestURL, method, params))
  );
  notifyPromiseToast(Details, promise, onClose);
  return promise.then((response: any) => {
    console.log(response);
    return response;
  });
}

export function CommonapiCall(
  requestURL: string,
  method: string,
  params: object
) {
  const promise = new Promise((resolve) =>
    resolve(apiCall(requestURL, method, params))
  );

  return promise.then((response: any) => {
    console.log(response);
    return response;
  });
}
export function apiCall(requestURL: string, method: string, params: object) {
  const token = getAcessToken();
  const baseURL = getBaseUrl();
  let headerParams: any = {};
  if (token) {
    headerParams = {
      "content-type": "application/json;charset=UTF-8",
      "x-access-token": token,
    };
  } else {
    headerParams = {
      "content-type": "application/json;charset=UTF-8",
    };
  }

  if (method === "GET") {
    return axios
      .get(baseURL + requestURL, { headers: headerParams })
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  } else if (method === "POST") {
    return axios
      .post(baseURL + requestURL, params, { headers: headerParams })
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }
}

export function apiCallMulti(
  requestURLS: [string],
  method: string,
  paramsArray: [object]
) {
  const token = getAcessToken();
  const headerParams: any = {
    "content-type": "application/json;charset=UTF-8",
    "x-access-token": token,
  };

  let promises: any = [];
  if (method === "GET")
    promises = requestURLS.map((elem) =>
      axios.get(getBaseUrl() + elem, { headers: headerParams })
    );
  if (method === "POST")
    promises = requestURLS.map((elem, index) =>
      axios.post(getBaseUrl() + elem, paramsArray[index], {
        headers: headerParams,
      })
    );
  return axios
    .all(promises)
    .then(axios.spread((...responseArray) => responseArray))
    .catch((error) => console.log(error));
}
