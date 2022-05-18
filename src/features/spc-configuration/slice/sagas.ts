import {
  put,
  takeLatest,
  //   takeEvery,
  call,
  select,
  all,
  //   debounce,
} from "redux-saga/effects";
import {
  loadSPCData,
  SPCDataLoaded,
  loadSPCTemplate,
  SPCTemplateLoaded,
  SaveParamsSetting,
  ApplyParamsSetting,
  UpdateSPCTemplate,
  SetTreeDepartments,
  EndApiCalling,
} from "./index";
import {
  ResponseSPCTestData,
  ResponseSPCTemplateData,
  SPCControllerField,
  SaveSPCTemplateReq,
  SaveAPIRes,
} from "./types";
import { selectSPCDepartmentData } from "./selectors";
import { apiCall } from "../../../utils/Network";
import { PayloadAction } from "@reduxjs/toolkit";
import { getDepartmentTreeData } from "../utils";

export function* getSPCNewFunction(): any {
  try {
    const data: ResponseSPCTestData = yield call(
      apiCall,
      "GetSPCTestParameters",
      "POST",
      {}
    );
    yield put(SPCDataLoaded({ data }));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* getSPCTemplateFunction(): any {
  try {
    const data: ResponseSPCTemplateData = yield call(
      apiCall,
      "GetSPCTestParamTemplates",
      "POST",
      {}
    );
    yield put(SPCTemplateLoaded({ data }));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* getSaveParamsSetting(
  ActionData: PayloadAction<SPCControllerField>
): any {
  try {
    const resData: SaveAPIRes = yield call(
      apiCall,
      "SaveSPCTestParameters",
      "POST",
      {
        Params: ActionData.payload,
      }
    );
    yield call(getSPCNewFunction);
    const department = yield select(selectSPCDepartmentData);
    const treeDepartment = getDepartmentTreeData(department);
    yield put(SetTreeDepartments(treeDepartment));
    yield put(EndApiCalling(resData.FunctionSucceed));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* getApplyParamsSetting(
  ActionData: PayloadAction<{ Params: SPCControllerField; ids: number[] }>
): any {
  try {
    yield call(apiCall, "ApplySPCSettingToFields", "POST", {
      Params: ActionData.payload.Params,
      ApplyToFieldIDs: ActionData.payload.ids,
    });
    yield call(getSPCNewFunction);
    const department = yield select(selectSPCDepartmentData);
    const treeDepartment = getDepartmentTreeData(department);
    yield put(SetTreeDepartments(treeDepartment));
    // yield put(EndApiCalling(resData.FunctionSucceed));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* updateSPCParamsTemplates(
  ActionData: PayloadAction<SaveSPCTemplateReq>
): any {
  try {
    yield call(apiCall, "UpdateSPCTestParamTemplate", "POST", {
      TemplateID: ActionData.payload.TemplateID,
      TemplateName: ActionData.payload.TemplateName,
      UpdateType: ActionData.payload.UpsertType,
      Params: ActionData.payload.Params,
    });
    yield put(loadSPCTemplate());
  } catch (err: any) {
    console.log("err", err);
  }
}

function* actionWatcher_SPC() {
  yield all([takeLatest(loadSPCData, getSPCNewFunction)]);
  yield all([takeLatest(loadSPCTemplate, getSPCTemplateFunction)]);
  yield all([takeLatest(SaveParamsSetting, getSaveParamsSetting)]);
  yield all([takeLatest(ApplyParamsSetting, getApplyParamsSetting)]);
  yield all([takeLatest(UpdateSPCTemplate, updateSPCParamsTemplates)]);
}
export default actionWatcher_SPC;
