import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  changeTimePeriod,
  saveDefindKPI,
  saveMainKPIs,
  setDataNameKPIs,
  setLastFetch,
  setLoadingDefKPI,
  setLoadingMain,
  setNumberOfKPIs,
} from "..";
import { notifyPromiseToast } from "../../../../Component/Toast/ToastContainer";
import { PromiseToastInterface } from "../../../../Component/Toast/type";
import {
  IDataChangeKPI,
  IDataDefinedKPIs,
  IDataGetName,
  IDataMainKPI,
  IDefinedKPIs,
  IGetCustomKPINames,
  IKPISave,
  IMainKPI,
} from "../../api/types";
import {
  selectMainKPIs,
  selectNameKPI,
  selectOpenKPIs,
  selectTimePeriod,
} from "../selectors";
import {
  dataIKPI,
  dataMainKPI,
  IChangeTimePeriodAction,
  mainKPI,
  TTimePeriod,
} from "../types";
import { KPIApi } from "../../api";
import {
  ChangeKPIAction,
  ClickSwitchAction,
  GetDefindKPIAction,
  ISaveKPIAction,
} from "./types";

export const getKPIFromResponse = (item: IMainKPI | IDefinedKPIs): dataIKPI => {
  return {
    isResultValid: item.IsResultValid,
    isPrimary: !!item.MainKPI,
    DecimalsRound: item.DecimalsRound,
    Formula: item.Formula,
    Filter: item.Filter,
    DisplayOrder: item.DisplayOrder,
    FormulaName: item.FormulaName,
    DisplayType: item.DisplayType,
    MaxValue: item.MaxValue,
    MaxValueDay: item.MaxValueDay,
    MaxValueMonth: item.MaxValueMonth,
    MaxValueShift: item.MaxValueShift,
    MaxValueWeek: item.MaxValueWeek,
    MinValue: item.MinValue,
    MinValueDay: item.MinValueDay,
    MinValueMonth: item.MinValueMonth,
    MinValueShift: item.MinValueShift,
    MinValueWeek: item.MinValueWeek,
    Result: item.Result,
    isActive: item.IsActive,
    FormulaID: item.FormulaID,
    creationDate: item.CreationDate,
  };
};

function* getNameKPI(id: number) {
  const nameKPIs: IDataGetName[] = yield select(selectNameKPI);
  let nameKPI = "";
  nameKPIs.forEach((item) =>
    item.Formulas.forEach((item) => {
      if (item.FormulaID === id) nameKPI = item.FormulaName;
    })
  );
  if (nameKPI.length > 10) {
    nameKPI = nameKPI.slice(0, 10) + "...";
  }
  return nameKPI;
}

export const createToast = (promise: Promise<any>, Title: string) => {
  const toastData: PromiseToastInterface = {
    success: {
      Title: Title + " successfully",
      SubTitle: "The action has been completed",
    },
    error: {
      Title: Title + " failed",
      SubTitle: "The action has been failed, try refreshing",
    },
    pending: {
      Title: Title + " loading",
      SubTitle: "Loading...",
    },
  };
  notifyPromiseToast(toastData, promise);
};

const deleteKPIFetch = async (ID: number, name: string) => {
  const promise = new Promise((resolve, reject) => {
    KPIApi.deleteCustomerDefinedKPI(ID).then((response) => {
      if (response.data.FunctionSucceed) {
        resolve(response);
      }
      reject();
    });
  });
  createToast(promise, `KPI ${name} deleted `);
  return await promise;
};

const duplicateKPIFetch = async (ID: number, name: string) => {
  const promise = new Promise((resolve, reject) => {
    KPIApi.duplicateCustomerDefinedKPI(ID).then((response) => {
      if (response.data.FunctionSucceed) {
        resolve(response);
      }
      reject();
    });
  });

  createToast(promise, `KPI ${name} duplicated `);
  return await promise;
};

const makePrimaryKPIFetch = async (ID: number, name: string) => {
  const promise = new Promise((resolve, reject) => {
    KPIApi.setMainKPIFormula(ID).then((response) => {
      if (response.data.FunctionSucceed) {
        resolve(response);
      }
      reject();
    });
  });

  createToast(promise, `KPI ${name} made primary `);
  return await promise;
};

const saveKPIFetch = async (kpi: IKPISave, name: string) => {
  const promise = new Promise((resolve, reject) => {
    KPIApi.saveCustomerDefinedKPI(kpi).then((response) => {
      if (response.data.FunctionSucceed) {
        const newKpi = { id: response.data.LeaderRecordID };
        sessionStorage.setItem("newKpi", JSON.stringify(newKpi));
        resolve(response);
      }
      reject();
    });
  });
  createToast(
    promise,
    `KPI ${name} ${kpi.FormulaID === 0 ? "created" : "edited"} `
  );
  return await promise;
};

const switchKPIFetch = async (kpi: IKPISave, name: string) => {
  const promise = new Promise((resolve, reject) => {
    KPIApi.saveCustomerDefinedKPI(kpi).then((response) => {
      if (response.data.FunctionSucceed) {
        resolve(response);
      }
      reject();
    });
  });
  createToast(
    promise,
    `KPI ${name} ${kpi.IsActive ? "activated" : "deactivated"} `
  );
  return await promise;
};

function* getDefindKPI(action: GetDefindKPIAction) {
  try {
    const { departmentID, timePeriod } = action.payload;

    yield put(setLoadingDefKPI({ isLoading: true, departmentID }));

    const data: AxiosResponse<IDataDefinedKPIs> =
      yield KPIApi.getCustomerDefinedKPIsResult(timePeriod, departmentID);

    const kpis = data.data.ResponseList.map((item) => getKPIFromResponse(item));

    yield put(
      saveDefindKPI({ kpis: { isLoading: false, data: kpis }, departmentID })
    );
  } catch {
    yield put(
      setLoadingDefKPI({
        isLoading: false,
        departmentID: action.payload.departmentID,
      })
    );
  }
}

function* getMainKPIs(action: PayloadAction<IChangeTimePeriodAction>) {
  try {
    const { timePeriod } = action.payload;
    const openKPIs: number[] = yield select(selectOpenKPIs);
    yield put(setLoadingMain({ isLoading: true }));

    const responseName: boolean = yield call(setKPIName);

    if (!responseName) throw Error();

    const data: AxiosResponse<IDataMainKPI> =
      yield KPIApi.getCustomerDefinedMainKPIs(timePeriod);
    const mainKPIs: dataMainKPI[] = data.data.ResponseList.map((item) => {
      return {
        DepartmentName: item.DepartmentName,
        DepartmentID: item.DepartmentID,
        primary: item.IsActive,
        NumberOfKPIs: item.NumberOfKPIs,
        primaryKPI: getKPIFromResponse(item),
        kpis: { isLoading: false, data: [] },
      };
    });
    yield put(saveMainKPIs({ mainKPIs: { isLoading: true, data: mainKPIs } }));
    yield put(setLastFetch({ time: new Date().toISOString() }));
    yield all(
      openKPIs.map((departmentID) =>
        call(getDefindKPI, {
          type: "",
          payload: { departmentID, timePeriod },
        })
      )
    );
    yield put(setLoadingMain({ isLoading: false }));
  } catch {
    console.log("Error on CustonKPI");
    yield put(setLoadingMain({ isLoading: false }));
  }
}

function* deleteKPI(action: ChangeKPIAction) {
  try {
    const { FormulaID } = action.payload;
    const nameKPI: string = yield call(getNameKPI, FormulaID);

    const data: AxiosResponse<IDataChangeKPI> = yield deleteKPIFetch(
      FormulaID,
      nameKPI
    );

    if (data.data.FunctionSucceed) {
      const timePeriod: TTimePeriod = yield select(selectTimePeriod);
      yield call(getMainKPIs, { type: "", payload: { timePeriod } });
    }
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* duplicateKPI(action: ChangeKPIAction) {
  try {
    const { FormulaID } = action.payload;
    const nameKPI: string = yield call(getNameKPI, FormulaID);
    const data: AxiosResponse<IDataChangeKPI> = yield duplicateKPIFetch(
      FormulaID,
      nameKPI
    );

    if (data.data.FunctionSucceed) {
      yield call(refreshMainKPI);
    }
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* makePrimaryKPI(action: ChangeKPIAction) {
  try {
    const { FormulaID } = action.payload;
    const nameKPI: string = yield call(getNameKPI, FormulaID);
    const data: AxiosResponse<IDataChangeKPI> = yield makePrimaryKPIFetch(
      FormulaID,
      nameKPI
    );

    if (data.data.FunctionSucceed) {
      yield call(refreshMainKPI);
    }
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* refreshMainKPI() {
  try {
    const timePeriod: TTimePeriod = yield select(selectTimePeriod);
    yield call(getMainKPIs, { type: "", payload: { timePeriod } });
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* switchKPI(action: ClickSwitchAction) {
  try {
    const { kpi, departmentID, isPrimaryUpdate } = action.payload;
    const mainKPIs: mainKPI = yield select(selectMainKPIs);
    const timePeriod: TTimePeriod = yield select(selectTimePeriod);
    const mainKPI = mainKPIs.data.find(
      (item) => item.DepartmentID === departmentID
    );

    const nameKPI: string = yield call(getNameKPI, kpi.FormulaID);
    const data: AxiosResponse<IDataChangeKPI> = yield switchKPIFetch(
      kpi,
      nameKPI
    );
    if (!data.data.FunctionSucceed || !mainKPI) return;

    yield put(setNumberOfKPIs({ departmentID, count: kpi.IsActive ? 1 : -1 }));

    const allDisable = !mainKPI.kpis.data.find((item) => item.isActive);

    if (allDisable || isPrimaryUpdate) {
      yield call(getMainKPIs, { type: "", payload: { timePeriod } });
    } else {
      yield call(getDefindKPI, {
        type: "",
        payload: { departmentID, timePeriod },
      });
    }
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* setKPIName() {
  try {
    const data: AxiosResponse<IGetCustomKPINames> =
      yield KPIApi.getCustomKPINames();
    yield put(setDataNameKPIs({ data: data.data.ResponseList }));
    return !!data.data.ResponseList.length;
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* saveKPI(action: ISaveKPIAction) {
  try {
    const nameKPI: string = yield call(
      getNameKPI,
      action.payload.kpi.FormulaID
    );
    yield call(saveKPIFetch, action.payload.kpi, nameKPI);
  } catch {
    console.log("Error on CustonKPI");
  }
}

function* sagaKPIWatcher() {
  yield all([
    takeLatest(changeTimePeriod, getMainKPIs),
    takeLatest("REFRESH_MAIN_KPIS", refreshMainKPI),
    takeLatest("OPEN_MAIN_KPI", getDefindKPI),
    takeLatest("DELETE_KPI", deleteKPI),
    takeLatest("DUPLICATE_KPI", duplicateKPI),
    takeLatest("MAKE_PRIMARY_KPI", makePrimaryKPI),
    takeLatest("SAVE_KPI", saveKPI),
    takeLatest("CLICK_SWITCH_KPI", switchKPI),
    takeLatest("SET_KPI_NAME", setKPIName),
  ]);
}

export default sagaKPIWatcher;
