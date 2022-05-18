import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import {
  APIGetInventoryListForMaterialParams,
  APIInventoryListForMaterial,
  APIMachineMainChannelsParametersData,
  APIMaterialsList,
  APIProductRecipeJob,
  APIProductReferenceRecipeJob,
  APISaveMachineMainChannelsParametersData,
  APIUpdateProductRecipeJob,
  Channel,
  ChannelParameter,
  DrawerExpanded,
  InventoryItem,
  LastUpdated,
  MachineChannel,
  MachineSplitsTableRow,
  MaterialItem,
  ProductionParameters,
  RecipeRef,
  SAVING_STATE,
  SelectedRecipeRefType,
  UpsertRecordByFormParams,
} from "../ts";

type SliceState = {
  productRecipeJob: Channel[];
  referenceRecipeJob: Channel[];
  machineMainChannelsParameters: MachineChannel[];
  loading: boolean;
  error: string | undefined;
  showReference: boolean;
  expandedDrawers: DrawerExpanded[];
  isEditing: boolean;
  updatedProductionParameters: ProductionParameters[];
  productionParametersTableData: {}[];
  initProductionParametersTableData: {}[];
  isUpdating: SAVING_STATE;
  jobId: number;
  machineSplitsTableData: { [channelNumber: number]: MachineSplitsTableRow[] };
  initMachineSplitsTableData: {
    [channelNumber: number]: MachineSplitsTableRow[];
  };
  updatedMachineSplits: ChannelParameter[];
  inventoryListForMaterial: InventoryItem[];
  materialsList: MaterialItem[];
  recipeRef: RecipeRef[];
  selectedRecipeRefType: SelectedRecipeRefType;
  lastUpdatedRecipeJob: LastUpdated;
  onSaveErrorMessage: string | undefined;
  shouldFocusCellWithError: boolean;
};

export const getProductRecipeJob = createAsyncThunk(
  "jobRecipe/DisplayProductRecipeJob",
  async (jobID: number) => {
    const res = await api
      .post<APIProductRecipeJob>(API_URLS.displayProductRecipeJob, {
        jobID,
        subMenuAppPartID: 10560,
        OnlyChannel0: true,
      })
      .then((res) => res.data);
    return res;
  }
);

export const getProductReferenceRecipeJob = createAsyncThunk<
  APIProductReferenceRecipeJob,
  number
>("jobRecipe/ProductReferenceRecipeJob", async (jobID, thunkAPI) => {
  const state = thunkAPI.getState() as { jobRecipe: SliceState };
  const res = await api
    .post<APIProductReferenceRecipeJob>(
      API_URLS.displayProductRecipeJobDetailsByType,
      {
        jobID,
        subMenuAppPartID: 10675,
        OnlyChannel0: true,
        recipeRefType: state.jobRecipe.selectedRecipeRefType.refType,
        standardID: state.jobRecipe.selectedRecipeRefType.standardID,
      }
    )
    .then((res) => res.data);
  return res;
});

export const getMachineMainChannelsParametersData = createAsyncThunk<
  APIMachineMainChannelsParametersData,
  number
>("jobRecipe/MachineMainChannelsParametersData", async (jobID, thunkAPI) => {
  const state = thunkAPI.getState() as { jobRecipe: SliceState };
  const res = await api
    .post<APIMachineMainChannelsParametersData>(
      API_URLS.getMachineMainChannelsParametersData,
      {
        jobID,
        RecipeRefType: state.jobRecipe.selectedRecipeRefType.refType,
        StandardID: state.jobRecipe.selectedRecipeRefType.standardID,
      }
    )
    .then((res) => res.data);
  return res;
});

export const updateProductRecipeJob = createAsyncThunk<
  void,
  APIUpdateProductRecipeJob
>(
  "jobRecipe/UpdateProductRecipeJob",
  async ({ JobID, recipeValue }, thunkAPI) => {
    const state = thunkAPI.getState() as { jobRecipe: SliceState };
    await api
      .post(API_URLS.updateProductRecipeJob, {
        JobID: JobID,
        subMenuAppPartID: 10010,
        recipeValue: recipeValue,
        recipeRefStandardID: state.jobRecipe.selectedRecipeRefType.standardID,
        recipeRefType: state.jobRecipe.selectedRecipeRefType.refType,
      })
      .then((res) => res.data);
  }
);

export const copyFromReferenceRecipeJob = createAsyncThunk(
  "jobRecipe/CopyFromReferenceRecipeJob",
  async (JobID: number) => {
    await api
      .post(API_URLS.initRecipeAccordingToStartData, {
        JobID,
        recipeRefType: 1,
        recipeRefStandardID: 0,
      })
      .then((res) => res.data);
  }
);

export const saveMachineMainChannelsParametersData = createAsyncThunk<
  APISaveMachineMainChannelsParametersData,
  ChannelParameter[]
>(
  "jobRecipe/SaveMachineMainChannelsParametersData",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState() as { jobRecipe: SliceState };
    const resp = await api
      .post<APISaveMachineMainChannelsParametersData>(
        API_URLS.saveMachineMainChannelsParametersData,
        {
          JobID: state.jobRecipe.jobId,
          ChannelsParameters: params,
          recipeRefStandardID: state.jobRecipe.selectedRecipeRefType.standardID,
          recipeRefType: state.jobRecipe.selectedRecipeRefType.refType,
        }
      )
      .then((res) => res.data);
    return resp;
  }
);

export const getInventoryListForMaterial = createAsyncThunk(
  "jobRecipe/GetInventoryListForMaterial",
  async (params: APIGetInventoryListForMaterialParams) => {
    const res = await api
      .post<APIInventoryListForMaterial>(API_URLS.getInventoryListForMaterial, {
        ...params,
      })
      .then((res) => res.data);
    return res;
  }
);

export const getMaterialsList = createAsyncThunk(
  "jobRecipe/GetMaterialsList",
  async () => {
    const res = await api
      .post<APIMaterialsList>(API_URLS.getMaterialsList, {})
      .then((res) => res.data);
    return res;
  }
);

export const copyJobRecipeToProductRecipe = createAsyncThunk(
  "jobRecipe/CopyJobRecipeToProductRecipe",
  async (JobID: number) => {
    await api
      .post(API_URLS.copyJobRecipeToProductRecipe, {
        JobID,
      })
      .then((res) => res.data);
  }
);

export const upsertRecordByForm = createAsyncThunk(
  "jobRecipe/UpsertRecordByForm",
  async (params: UpsertRecordByFormParams) => {
    await api
      .post(API_URLS.upsertRecordByForm, {
        LeaderID: 0,
        formID: 50500,
        skipSaveOperation: false,
        pairs: params,
      })
      .then((res) => res.data);
  }
);

const initialState: SliceState = {
  productRecipeJob: [],
  referenceRecipeJob: [],
  machineMainChannelsParameters: [],
  loading: false,
  error: undefined,
  showReference: false,
  expandedDrawers: [],
  isEditing: false,
  updatedProductionParameters: [],
  productionParametersTableData: [],
  initProductionParametersTableData: [],
  isUpdating: SAVING_STATE.IDLE,
  jobId: -1,
  machineSplitsTableData: {} as {
    [channelNumber: number]: MachineSplitsTableRow[];
  },
  initMachineSplitsTableData: {} as {
    [channelNumber: number]: MachineSplitsTableRow[];
  },
  updatedMachineSplits: [],
  inventoryListForMaterial: [],
  materialsList: [],
  recipeRef: [],
  selectedRecipeRefType: { refType: 1, standardID: 0 },
  lastUpdatedRecipeJob: { date: "", updatedBy: "" },
  onSaveErrorMessage: undefined,
  shouldFocusCellWithError: false,
};

export const jobRecipeSlice = createSlice({
  name: "jobRecipe",
  initialState,
  reducers: {
    toggleShowReference(state) {
      state.showReference = !state.showReference;
    },
    setExpandedDrawers(state, action: PayloadAction<DrawerExpanded[]>) {
      state.expandedDrawers = action.payload;
    },
    updateDrawerExpanded(state, action: PayloadAction<DrawerExpanded>) {
      const { drawerId, expanded } = action.payload;
      const drawer = state.expandedDrawers.find((d) => d.drawerId === drawerId);
      if (drawer) {
        drawer.expanded = expanded;
      } else {
        state.expandedDrawers.push({ drawerId, expanded });
      }
    },
    setEditing(state, { payload }: PayloadAction<boolean>) {
      state.isEditing = payload;
    },
    updateProductionParameters(
      state,
      action: PayloadAction<ProductionParameters>
    ) {
      const paramIndex = state.updatedProductionParameters.findIndex(
        (param) => param.RecipeID === action.payload.RecipeID
      );
      if (paramIndex === -1) {
        state.updatedProductionParameters.push(action.payload);
      } else {
        state.updatedProductionParameters[paramIndex] = action.payload;
      }
    },
    setProductionParametersTableData(state, action: PayloadAction<{}[]>) {
      state.productionParametersTableData = action.payload;
    },
    setInitProductionParametersTableData(state, action: PayloadAction<{}[]>) {
      state.initProductionParametersTableData = action.payload;
    },
    setJobId(state, action: PayloadAction<number>) {
      state.jobId = action.payload;
    },
    setInitMachineSplitsTableData(
      state,
      action: PayloadAction<{
        channelNumber: number;
        values: MachineSplitsTableRow[];
      }>
    ) {
      state.initMachineSplitsTableData[action.payload.channelNumber] =
        action.payload.values;
    },
    setMachineSplitsTableData(
      state,
      action: PayloadAction<{
        channelNumber: number;
        values: MachineSplitsTableRow[];
      }>
    ) {
      state.machineSplitsTableData[action.payload.channelNumber] =
        action.payload.values;
    },
    updateMachineSplits(state, action: PayloadAction<ChannelParameter>) {
      const paramIndex = state.updatedMachineSplits.findIndex(
        (param) =>
          param.ChannelNum === action.payload.ChannelNum &&
          param.KeyName === action.payload.KeyName &&
          param.SplitNum === action.payload.SplitNum
      );
      if (paramIndex === -1) {
        state.updatedMachineSplits.push(action.payload);
      } else {
        state.updatedMachineSplits[paramIndex] = action.payload;
      }
    },
    resetUpdatedData(state) {
      state.updatedProductionParameters = [];
      state.updatedMachineSplits = [];
    },
    setSelectedRecipeRefType(
      state,
      action: PayloadAction<SelectedRecipeRefType>
    ) {
      state.selectedRecipeRefType = action.payload;
    },
    setSavingState(state, action: PayloadAction<SAVING_STATE>) {
      state.isUpdating = action.payload;
    },
    resetOnSaveErrorMessage(state) {
      state.onSaveErrorMessage = undefined;
    },
    setShouldFocusCellWithError(state, action: PayloadAction<boolean>) {
      state.shouldFocusCellWithError = action.payload;
    },
  },
  extraReducers: (builder) => {
    //getProductRecipeJob
    builder.addCase(getProductRecipeJob.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.lastUpdatedRecipeJob.date = "";
      state.lastUpdatedRecipeJob.updatedBy = "";
    });
    builder.addCase(getProductRecipeJob.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.error && payload.error.ErrorMessage) {
        state.error = payload.error.ErrorMessage;
      }
      state.productRecipeJob = payload.Recipe?.channels;
      state.recipeRef = payload.RecipeRef;
      state.lastUpdatedRecipeJob.date = payload.RecipeJobLastUpdate;
      state.lastUpdatedRecipeJob.updatedBy = payload.RecipeJobUpdatedBy;
    });
    builder.addCase(getProductRecipeJob.rejected, (state) => {
      state.loading = false;
    });

    //getProductReferenceRecipeJob
    builder.addCase(getProductReferenceRecipeJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProductReferenceRecipeJob.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.referenceRecipeJob = payload.channels;
      }
    );
    builder.addCase(getProductReferenceRecipeJob.rejected, (state) => {
      state.loading = false;
    });

    //getMachineMainChannelsParametersData
    builder.addCase(getMachineMainChannelsParametersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMachineMainChannelsParametersData.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.machineMainChannelsParameters = payload.Chanels;
      }
    );
    builder.addCase(getMachineMainChannelsParametersData.rejected, (state) => {
      state.loading = false;
    });

    //updateProductRecipeJob
    builder.addCase(updateProductRecipeJob.pending, (state) => {
      state.isUpdating = SAVING_STATE.SAVING;
      state.isEditing = false;
    });
    builder.addCase(updateProductRecipeJob.fulfilled, (state) => {
      state.isUpdating = SAVING_STATE.SAVED;
    });
    builder.addCase(updateProductRecipeJob.rejected, (state) => {
      state.isUpdating = SAVING_STATE.IDLE;
    });

    //saveMachineMainChannelsParametersData
    builder.addCase(saveMachineMainChannelsParametersData.pending, (state) => {
      state.isUpdating = SAVING_STATE.SAVING;
      state.isEditing = false;
    });
    builder.addCase(
      saveMachineMainChannelsParametersData.fulfilled,
      (state, { payload }) => {
        state.onSaveErrorMessage = payload.error?.ErrorMessage;
        if (!payload.error) {
          state.isUpdating = SAVING_STATE.SAVED;
        } else {
          state.isUpdating = SAVING_STATE.IDLE;
        }
      }
    );
    builder.addCase(saveMachineMainChannelsParametersData.rejected, (state) => {
      state.isUpdating = SAVING_STATE.IDLE;
    });

    //getInventoryListForMaterial
    builder.addCase(
      getInventoryListForMaterial.fulfilled,
      (state, { payload }) => {
        state.inventoryListForMaterial =
          payload.ResponseDictionaryDT.InventoryItems || [];
      }
    );
    builder.addCase(getInventoryListForMaterial.rejected, (state) => {
      state.inventoryListForMaterial = [];
    });

    //getMaterialsList
    builder.addCase(getMaterialsList.fulfilled, (state, { payload }) => {
      state.materialsList = payload.ResponseDictionaryDT.Materials;
    });
  },
});

export const {
  toggleShowReference,
  setExpandedDrawers,
  updateDrawerExpanded,
  setEditing,
  updateProductionParameters,
  setProductionParametersTableData,
  setInitProductionParametersTableData,
  setJobId,
  setMachineSplitsTableData,
  setInitMachineSplitsTableData,
  updateMachineSplits,
  resetUpdatedData,
  setSelectedRecipeRefType,
  setSavingState,
  resetOnSaveErrorMessage,
  setShouldFocusCellWithError,
} = jobRecipeSlice.actions;

export default jobRecipeSlice.reducer;
