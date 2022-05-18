import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../Examples/Counter/counterSlice";
import counterReducer2 from "../Examples/Counter2/counterSlice2";
import createNewRuleSlice from "../Containers/CreateNewRule/slice";
import RulesContainerSlice from "../Containers/RuleContainer/slice";
import middlewareSlice from "../utils/React2Ang/designSystem/MiddlewareSlice";
import Appslice from "../slice";
import spcSlice from "../features/spc-configuration/slice";
import sliceKPI from "../features/kpi/reducer";
import loginSlice from "../features/login/slice";
import productRecipeSlice from "../features/product-recipe/slice";

export const rootReducer = combineReducers({
  App: Appslice,
  counter: counterReducer,
  counter2: counterReducer2,
  rules: createNewRuleSlice,
  RulesContainerSlice: RulesContainerSlice,
  middlewareSlice: middlewareSlice,
  spc: spcSlice,
  productRecipe: productRecipeSlice,
  kpi: sliceKPI,
  login: loginSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
