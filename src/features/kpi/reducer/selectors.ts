import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/rootReducer";
import { initialState } from ".";

const selectDomain = (state: RootState) => state.kpi || initialState;

export const selectMainKPIs = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.mainKPIs
);

export const selectTimePeriod = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.timePeriod
);

export const selectIsCreate = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.isCreate
);

export const selectStepCreate = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.stepCreate
);

export const selectCreateState = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.createState
);

export const selectLastFetch = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.lastFetch
);

export const selectOpenKPIs = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.openKPIs
);

export const selectNameKPI = createSelector(
  [selectDomain],
  (sliceKPI) => sliceKPI.nameAllKPIs
);
