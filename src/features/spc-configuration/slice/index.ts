import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SPCTestState,
  ResponseSPCTestData,
  TreeData,
  SelectedMachine,
  ResponseSPCTemplateData,
  SPCControllerField,
  SaveSPCTemplateReq,
} from "./types";

export const initialState: SPCTestState = {
  Departments: [],
  TestsText: [],
  loading: false,
  SelectedMachines: [],
  TreeDepartments: [],
  Step: 1,
  TreeSelectedMachines: [],
  DetailMachine: undefined,
  SPCTemplates: [],
  ApiCallEnd: undefined,
};

export const spcSlice = createSlice({
  name: "SPCSlice",
  initialState,
  reducers: {
    loadSPCData: (state) => {
      state.loading = true;
    },
    SPCDataLoaded(state, action: PayloadAction<{ data: ResponseSPCTestData }>) {
      const data = action.payload;
      state.Departments = data.data.Departments;
      state.TestsText = data.data.TestsText;
      state.loading = false;
    },
    loadSPCTemplate: (state) => {
      state.SPCTemplates = [];
    },
    SPCTemplateLoaded(
      state,
      action: PayloadAction<{ data: ResponseSPCTemplateData }>
    ) {
      const data = action.payload;
      state.SPCTemplates = data.data.ResponseDictionaryValues.Templates;
    },
    SetStep(state, action: PayloadAction<1 | 2 | 3>) {
      state.Step = action.payload;
    },
    SetTreeDepartments(state, action: PayloadAction<TreeData[]>) {
      state.TreeDepartments = action.payload;
    },
    SetSelectedMachines(state, action: PayloadAction<SelectedMachine[]>) {
      state.SelectedMachines = action.payload;
    },
    SetTreeSelectedMachines(state, action: PayloadAction<TreeData[]>) {
      state.TreeSelectedMachines = action.payload;
    },
    SetDetailMachine(state, action: PayloadAction<TreeData>) {
      state.DetailMachine = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SaveParamsSetting(state, action: PayloadAction<SPCControllerField>) {
      state.ApiCallEnd = false;
    },
    ApplyParamsSetting(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ Params: SPCControllerField; ids: number[] }>
    ) {
      console.log("ApplyParamsSetting");
    },
    EndApiCalling(state, action: PayloadAction<boolean | undefined>) {
      state.ApiCallEnd = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    UpdateSPCTemplate(state, action: PayloadAction<SaveSPCTemplateReq>) {
      console.log("UpdateSPCTemplate");
    },
  },
});

export const {
  loadSPCData,
  SPCDataLoaded,
  SetSelectedMachines,
  SetTreeDepartments,
  SetStep,
  SetTreeSelectedMachines,
  SetDetailMachine,
  loadSPCTemplate,
  SPCTemplateLoaded,
  SaveParamsSetting,
  ApplyParamsSetting,
  UpdateSPCTemplate,
  EndApiCalling,
} = spcSlice.actions;

export default spcSlice.reducer;
