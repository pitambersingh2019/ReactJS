import { put, takeLatest, call, all, delay } from "redux-saga/effects";
import { initFinished, init, setInit } from "./index";

import { apiCall } from "../../../utils/Network";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* initLogin() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = {};
    const responseLangs = yield call(apiCall, "JGetLanguageList", "GET", {});
    const initdata = yield call(apiCall, "init", "POST");
    yield put(setInit(initdata));
    const langs = responseLangs.LangList.map((elem) => ({
      ...elem,
      value: elem.ShortName,
      label: elem.SystemLng,
    }));
    langs.sort(function (a, b) {
      if (a.SystemLng < b.SystemLng) {
        return -1;
      }
      if (a.SystemLng > b.SystemLng) {
        return 1;
      }
      return 0;
    });
    data.languageItems = langs;
    yield delay(2000);
    yield put(initFinished(data));
  } catch (err) {
    console.log("err ", err);
  }
}

function* SagaWatcherLogin() {
  yield all([takeLatest(init, initLogin)]);
}

export default SagaWatcherLogin;
