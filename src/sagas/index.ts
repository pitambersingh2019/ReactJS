import { all } from "redux-saga/effects";

import actionWatcher_Trigger from "../Containers/RuleContainer/slice/saga";
import actionWatcher_CreateNewRule from "../Containers/CreateNewRule/slice/saga";
import actionWatcher_SPC from "../features/spc-configuration/slice/sagas";
import actionWatcher_ProductRecipe from "../features/product-recipe/slice/sagas";
import sagaKPIWatcher from "../features/kpi/reducer/saga";
import LoginSaga from "../features/login/slice/saga";

export default function* rootSaga() {
  yield all([
    actionWatcher_Trigger(),
    actionWatcher_CreateNewRule(),
    actionWatcher_SPC(),
    actionWatcher_ProductRecipe(),
    sagaKPIWatcher(),
    LoginSaga(),
  ]);
}
