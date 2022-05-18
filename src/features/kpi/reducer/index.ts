import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChangeTimePeriodAction,
  IInitialState,
  ICloseMainKPI,
  ISaveDefindKPI,
  ISaveKPIs,
  IStepCreate,
  ICraeteState,
  ISetLastFetch,
  ISetNumberOfKPIs,
  ISetOpenKPIs,
  ISetDataNameKPIs,
  ISetLoadingMain,
  ISetLoadingDef,
} from "./types";

export const initialCreateState: ICraeteState = {
  isPrimary: false,
  isActive: true,
  digists: 0,
  formulaID: 0,
  DepartmentName: "",
  departmentID: 0,
  KPIName: "New KPI",
  formula: "",
  displayType: "Gauge",
  gaugeType: "",
  filter: "",
  displayOrder: -1,
  MaxValue: 0,
  MaxValueDay: 0,
  MaxValueMonth: 0,
  MaxValueShift: 0,
  MaxValueWeek: 0,
  MinValue: 0,
  MinValueDay: 0,
  MinValueMonth: 0,
  MinValueShift: 0,
  MinValueWeek: 0,
};

export const initialState: IInitialState = {
  mainKPIs: { isLoading: false, data: [] },
  openKPIs: [],
  nameAllKPIs: [],
  timePeriod: 5,
  isCreate: false,
  stepCreate: 1,
  createState: initialCreateState,
  lastFetch: new Date().toISOString(),
};

const sliceKPI = createSlice({
  name: "kpiCustomizition",
  initialState,
  reducers: {
    changeTimePeriod: (
      state,
      action: PayloadAction<IChangeTimePeriodAction>
    ) => {
      state.timePeriod = action.payload.timePeriod;
    },
    saveMainKPIs: (state, action: PayloadAction<ISaveKPIs>) => {
      state.mainKPIs = action.payload.mainKPIs;
    },
    closeMainKPI: (state, action: PayloadAction<ICloseMainKPI>) => {
      const { departmentID } = action.payload;
      const indexMainKPI = state.mainKPIs.data.findIndex(
        (item) => item.DepartmentID === departmentID
      );
      state.mainKPIs.data[indexMainKPI].kpis = { isLoading: false, data: [] };
      state.openKPIs.splice(state.openKPIs.indexOf(departmentID), 1);
    },
    saveDefindKPI: (state, action: PayloadAction<ISaveDefindKPI>) => {
      const indexMainKPI = state.mainKPIs.data.findIndex(
        (item) => item.DepartmentID === action.payload.departmentID
      );
      state.mainKPIs.data[indexMainKPI].kpis = action.payload.kpis;
    },
    setIsCreate: (state) => {
      state.isCreate = !state.isCreate;
    },
    setStepCreate: (state, action: PayloadAction<IStepCreate>) => {
      state.stepCreate = action.payload.step;
    },
    setCreateState: (state, action: PayloadAction<ICraeteState>) => {
      state.createState = { ...state.createState, ...action.payload };
    },
    setLastFetch: (state, action: PayloadAction<ISetLastFetch>) => {
      state.lastFetch = action.payload.time;
    },
    setNumberOfKPIs: (state, action: PayloadAction<ISetNumberOfKPIs>) => {
      const indexMainKPI = state.mainKPIs.data.findIndex(
        (item) => item.DepartmentID === action.payload.departmentID
      );
      state.mainKPIs.data[indexMainKPI].NumberOfKPIs += action.payload.count;
    },
    setOpenKPIs: (state, action: PayloadAction<ISetOpenKPIs>) => {
      state.openKPIs = action.payload.openKPIs;
    },
    setDataNameKPIs: (state, action: PayloadAction<ISetDataNameKPIs>) => {
      state.nameAllKPIs = action.payload.data;
    },
    setLoadingMain: (state, action: PayloadAction<ISetLoadingMain>) => {
      state.mainKPIs.isLoading = action.payload.isLoading;
    },
    setLoadingDefKPI: (state, action: PayloadAction<ISetLoadingDef>) => {
      const indexMainKPI = state.mainKPIs.data.findIndex(
        (item) => item.DepartmentID === action.payload.departmentID
      );
      state.mainKPIs.data[indexMainKPI].kpis.isLoading =
        action.payload.isLoading;
    },
  },
});

export const {
  changeTimePeriod,
  saveMainKPIs,
  closeMainKPI,
  saveDefindKPI,
  setIsCreate,
  setStepCreate,
  setCreateState,
  setLastFetch,
  setNumberOfKPIs,
  setOpenKPIs,
  setDataNameKPIs,
  setLoadingMain,
  setLoadingDefKPI,
} = sliceKPI.actions;

export default sliceKPI.reducer;
