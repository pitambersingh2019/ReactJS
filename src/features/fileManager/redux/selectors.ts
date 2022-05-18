import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";
import { RootState } from "./store";

const selectDomain = (state: RootState) => state.syncTool || initialState;

export const selectStatus = createSelector(
  [selectDomain],
  (state) => state.status
);

export const selectIsAdmin = createSelector(
  [selectDomain],
  (state) => state.isAdmin
);

export const selectSyncFiles = createSelector(
  [selectDomain],
  (state) => state.syncFiles
);

export const selectSelectedPeriod = createSelector(
  [selectDomain],
  (state) => state.selectedPeriod
);

export const selectIsValidFile = createSelector(
  [selectDomain],
  (state) => state.isValidFile
);

export const selectFileUploadError = createSelector(
  [selectDomain],
  (state) => state.fileUploadError
);

export const selectUploadedFileName = createSelector(
  [selectDomain],
  (state) => state.uploadedFileName
);

export const selectTableNames = createSelector([selectDomain], (state) => {
  const data = state.syncFieldsData;
  return state.syncFieldsData.SyncObjects.flatMap((object) =>
    data[object.Name]
      ? {
          value: object.ID,
          label: object.Name,
        }
      : []
  );
});

export const selectMappedTableNames = createSelector(
  [selectDomain],
  (state) => {
    const data = state.syncFieldsData;
    return state.syncFieldsData.SyncObjects.flatMap((object) =>
      data[object.Name] &&
      data[object.Name].some((field) => field.sourcefieldname !== null)
        ? {
            value: object.ID,
            label: object.Name,
          }
        : []
    );
  }
);

export const selectTables = createSelector(
  [selectDomain],
  (state) => state.syncFieldsData
);

export const selectFilesDelimiter = createSelector(
  [selectDomain],
  (state) => state.syncFieldsData.FileTypeDelimiter
);

export const selectUserColumns = createSelector(
  [selectDomain],
  (state) => state.parsedFileData?.headers || []
);

export const selectRequiredFieldsIds = createSelector(
  [selectDomain],
  (state) => state.requiredFieldsIds
);

export const selectMappedColumns = createSelector(
  [selectDomain],
  (state) => state.mappedColumns
);

export const selectSelectedInterface = createSelector(
  [selectDomain],
  (state) => state.selectedInterface
);

export const selectIsMapped = createSelector(
  [selectDomain],
  (state) => state.isMapped
);

export const selectIsValidationMappingError = createSelector(
  [selectDomain],
  (state) => state.isValidationMappingError
);

export const selectValidationError = createSelector(
  [selectDomain],
  (state) => state.validationError
);
