// import store from './Redux/store'
// import {SetLang,SetRtl} from './slice';

const userAuth = window.sessionStorage.getItem("ngStorage-userAuthenticated");
const userAuthobj = userAuth ? JSON.parse(userAuth) : null;
const valueUserAuth = "null";
if (userAuthobj === null) {
  window.sessionStorage.setItem("ngStorage-userAuthenticated", valueUserAuth);
}

const ngStoragelanguage = window.sessionStorage.getItem("ngStorage-language");
const ngStoragelanguageobj = ngStoragelanguage
  ? JSON.parse(ngStoragelanguage)
  : null;
const valuengStoragelanguage = '"eng"';
if (ngStoragelanguageobj === null) {
  window.sessionStorage.setItem("ngStorage-language", valuengStoragelanguage);
}

const ngStoragertl = window.sessionStorage.getItem("ngStorage-rtl");
const ngStoragertlobj = ngStoragertl ? JSON.parse(ngStoragertl) : null;
const valuengStoragertl = "false";
if (ngStoragertlobj === null) {
  window.sessionStorage.setItem("ngStorage-rtl", valuengStoragertl);
}

const ngStorageuserID = window.sessionStorage.getItem("ngStorage-userID");
const ngStorageuserIDobj = ngStorageuserID ? JSON.parse(ngStorageuserID) : null;
const valueStorageuserID = "0";
if (ngStorageuserIDobj === null) {
  window.sessionStorage.setItem("ngStorage-userID", valueStorageuserID);
}

const ngBaseUrl = window.sessionStorage.getItem("ngStorage-baseUrl");
const ngBaseUrlObj = ngBaseUrl ? JSON.parse(ngBaseUrl) : null;
if (ngBaseUrlObj === null) {
  window.sessionStorage.setItem(
    "ngStorage-baseUrl",
    `"https://apidev.my.leadermes.com/LeaderMESApi/"`
  );
}

const ngDatePick = window.sessionStorage.getItem("ngStorage-DatePickLng");
const ngDatePickObj = ngDatePick ? JSON.parse(ngDatePick) : null;
if (ngDatePickObj === null) {
  window.sessionStorage.setItem("ngStorage-DatePickLng", `"en-gb"`);
}

export const isRtl = () => {
  try {
    const serialState = window.sessionStorage.getItem("ngStorage-rtl");
    if (serialState === null || serialState === "false") {
      return "ltr";
    } else {
      return "rtl";
    }
  } catch (err) {
    return "ltr";
  }
};

export const loadStateUser = () => {
  try {
    const serialState = window.sessionStorage.getItem(
      "ngStorage-userAuthenticated"
    );
    if (serialState === null) {
      return "undefined";
    }
    return serialState;
  } catch (err) {
    return "undefined";
  }
};

export const loadStateLang = () => {
  try {
    const serialState = window.sessionStorage.getItem("ngStorage-language");
    if (serialState === null) {
      return "undefined";
    }
    return serialState;
  } catch (err) {
    return "undefined";
  }
};

export const LoadUserID = () => {
  try {
    const serialState = window.sessionStorage.getItem("ngStorage-userID");
    if (serialState === null) {
      return "undefined";
    }
    return serialState;
  } catch (err) {
    return "undefined";
  }
};

export const loadDatePickerLang = () => {
  try {
    const serialState = window.sessionStorage.getItem("ngStorage-DatePickLng");
    if (serialState === null) {
      return "undefined";
    }
    return serialState;
  } catch (err) {
    return "undefined";
  }
};
