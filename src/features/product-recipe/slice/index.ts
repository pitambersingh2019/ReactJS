import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductRecipeState,
  ResponseRecipeDetailsData,
  ChangedValue,
  ResponseMaterialsList,
} from "./types";

export const initialState: ProductRecipeState = {
  loading: false,
  LastUpdate: undefined,
  UpdatedBy: undefined,
  Channels: undefined,
  editing: false,
  collapsStatus: [],
  changedValues: [],
  productID: undefined,
  MaterialsList: [],
  UpdatingStatus: "init",
};

export const productRecipeSlice = createSlice({
  name: "ProductRecipeSlice",
  initialState,
  reducers: {
    loadProductRecipeData: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.productID = action.payload;
      state.UpdatingStatus = "init";
    },
    ProductRecipeDataLoaded(
      state,
      action: PayloadAction<{ resData: ResponseRecipeDetailsData }>
    ) {
      const data = action.payload;
      state.loading = false;
      state.LastUpdate = data.resData.LastUpdate;
      state.UpdatedBy = data.resData.UpdatedBy;
      state.Channels = data.resData.channels;
      state.collapsStatus = data.resData.channels.map(() => {
        return true;
      });
    },
    loadMaterialsList: (state) => {
      state.MaterialsList = [];
    },
    MaterialsListLoaded(
      state,
      action: PayloadAction<{ resData: ResponseMaterialsList }>
    ) {
      const data = action.payload;
      state.MaterialsList = data.resData.ResponseDictionaryDT.Materials;
    },
    SetEditing(state, action: PayloadAction<boolean>) {
      state.editing = action.payload;
      if (!action.payload) {
        state.changedValues = [];
      }
    },
    SetIndividualCollapsStatus(
      state,
      action: PayloadAction<{ index: number; value: boolean }>
    ) {
      state.collapsStatus[action.payload.index] = action.payload.value;
    },
    SetAllCollapsStatus(state, action: PayloadAction<boolean>) {
      state.collapsStatus = state.collapsStatus.map(() => {
        return action.payload;
      });
    },
    SetChangedRecipeValue(state, action: PayloadAction<ChangedValue>) {
      const index = state.changedValues.findIndex(
        (elem) => elem.RecipeID === action.payload.RecipeID
      );
      if (index >= 0) {
        state.changedValues[index] = Object.assign(
          state.changedValues[index],
          action.payload
        );
      } else {
        state.changedValues.push(action.payload);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SaveAllChanges(state, action: PayloadAction<ChangedValue[]>) {
      console.log("SaveAllChanges");
      state.UpdatingStatus = "saving";
    },
    SetUpdatingStatus(
      state,
      action: PayloadAction<"init" | "saving" | "saved">
    ) {
      state.UpdatingStatus = action.payload;
    },
  },
});

export const {
  loadProductRecipeData,
  ProductRecipeDataLoaded,
  loadMaterialsList,
  MaterialsListLoaded,
  SetEditing,
  SetIndividualCollapsStatus,
  SetAllCollapsStatus,
  SetChangedRecipeValue,
  SaveAllChanges,
  SetUpdatingStatus,
} = productRecipeSlice.actions;

export default productRecipeSlice.reducer;
