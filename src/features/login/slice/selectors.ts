import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../Redux/rootReducer";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.login || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  (slice) => slice.loading
);

export const selectLanguageItems = createSelector(
  [selectDomain],
  (slice) => slice.languageItems
);

export const selectLanguage = createSelector(
  [selectDomain],
  (slice) => slice.language
);

export const selectInit = createSelector([selectDomain], (slice) => slice.init);
export const selectImgLarge = createSelector(
  [selectDomain],
  (slice) => slice.init?.ResponseList[4][0].Value
);

export const selectImgMed = createSelector(
  [selectDomain],
  (slice) => slice.init?.ResponseList[5][0].Value
);

export const selectImgSmall = createSelector(
  [selectDomain],
  (slice) => slice.init?.ResponseList[6][0].Value
);

export const selectAzureClientId = createSelector([selectDomain], (slice) =>
  slice.init?.ResponseDictionaryValues.find(
    (elem: any) => elem.Key === "AzureClientID"
  )
);

export const selectSession = createSelector(
  [selectDomain],
  (slice) => slice.session
);
