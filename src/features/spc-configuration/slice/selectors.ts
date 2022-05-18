import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.spc || initialState;

export const selectSPCDepartmentData = createSelector(
  [selectDomain],
  (spc) => spc.Departments
);

export const selectSPCTestsText = createSelector(
  [selectDomain],
  (spc) => spc.TestsText
);

export const selectSPCSelectedMachines = createSelector(
  [selectDomain],
  (spc) => spc.SelectedMachines
);

export const selectTreeDepartments = createSelector(
  [selectDomain],
  (spc) => spc.TreeDepartments
);

export const selectSPCDataLoading = createSelector(
  [selectDomain],
  (spc) => spc.loading
);

export const selectSPCStep = createSelector([selectDomain], (spc) => spc.Step);

export const selectTreeSelectedMachines = createSelector(
  [selectDomain],
  (spc) => spc.TreeSelectedMachines
);

export const selectDetailMachine = createSelector(
  [selectDomain],
  (spc) => spc.DetailMachine
);

export const selectSPCTemplates = createSelector(
  [selectDomain],
  (spc) => spc.SPCTemplates
);

export const selectAPICalling = createSelector(
  [selectDomain],
  (spc) => spc.ApiCallEnd
);
