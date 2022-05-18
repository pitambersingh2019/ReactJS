import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.productRecipe || initialState;

export const selectProductRecipeDataLoading = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.loading
);

export const selectSavingStatus = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.UpdatingStatus
);

export const selectUpdatedData = createSelector(
  [selectDomain],
  (productRecipe) => {
    return {
      lastUpdated: productRecipe.LastUpdate,
      updatedBy: productRecipe.UpdatedBy,
    };
  }
);

export const selectProductRecipeChannels = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.Channels
);

export const selectEditMode = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.editing
);

export const selectCollapsStatus = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.collapsStatus
);

export const selectChangedValues = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.changedValues
);

export const selectProductID = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.productID
);

export const selectMaterialsList = createSelector(
  [selectDomain],
  (productRecipe) => productRecipe.MaterialsList
);
