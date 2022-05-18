import {
  put,
  takeLatest,
  //   takeEvery,
  call,
  select,
  all,
  delay,
  //   debounce,
} from "redux-saga/effects";
import {
  loadProductRecipeData,
  ProductRecipeDataLoaded,
  loadMaterialsList,
  MaterialsListLoaded,
  SaveAllChanges,
  SetEditing,
  SetUpdatingStatus,
} from "./index";
import {
  ResponseRecipeDetailsData,
  ChangedValue,
  ResponseMaterialsList,
} from "./types";
import { selectProductID } from "./selectors";
import { apiCall } from "../../../utils/Network";
import { PayloadAction } from "@reduxjs/toolkit";

export function* getProductRecipeNewFunction(
  ActionData: PayloadAction<number>
): any {
  const procutID = ActionData.payload;
  try {
    const resData: ResponseRecipeDetailsData = yield call(
      apiCall,
      "DisplayRecipeDetails",
      "POST",
      {
        ProductID: procutID,
        subMenuAppPartID: 10010,
      }
    );
    yield put(ProductRecipeDataLoaded({ resData }));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* getMaterialListNewFunction(): any {
  try {
    const resData: ResponseMaterialsList = yield call(
      apiCall,
      "GetMaterialsList",
      "POST",
      {}
    );
    yield put(MaterialsListLoaded({ resData }));
  } catch (err: any) {
    console.log("err", err);
  }
}

export function* updateSaveAllChanges(
  ActionData: PayloadAction<ChangedValue[]>
): any {
  const productID = yield select(selectProductID);
  try {
    yield call(apiCall, "UpdateProductRecipe", "POST", {
      ProductID: productID,
      subMenuAppPartID: 10010,
      recipeValue: ActionData.payload,
    });
    yield call(getProductRecipeNewFunction, {
      type: "ProductRecipeSlice/loadProductRecipeData",
      payload: productID,
    });
    yield put(SetEditing(false));
    yield put(SetUpdatingStatus("saved"));
    yield delay(2000);
    yield put(SetUpdatingStatus("init"));
  } catch (err: any) {
    console.log("err", err);
  }
}

function* actionWatcher_ProductRecipe() {
  yield all([takeLatest(loadProductRecipeData, getProductRecipeNewFunction)]);
  yield all([takeLatest(loadMaterialsList, getMaterialListNewFunction)]);
  yield all([takeLatest(SaveAllChanges, updateSaveAllChanges)]);
}
export default actionWatcher_ProductRecipe;
