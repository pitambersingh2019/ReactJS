import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import {
  APIGetImportSyncFields,
  APIGetS3FileObjectResponse,
  APIGetSyncFileStatus,
  APIUpdateSyncMappingForInterfaceParams,
  APIValidateSyncMappingForInterface,
  APIValidateSyncMappingResponse,
  MappedColumn,
  MappedColumns,
  ParsedFileData,
  SelectedInterface,
  SelectedPeriod,
  UploadedFile,
  UploadError,
} from "../ts";
import * as URLS from "../constants/url";
import { getFileNameAndExt } from "../../tasks-management/utils";

type SyncToolState = {
  isAdmin: boolean;
  status: "loading" | "success" | "error" | "idle";
  syncFiles: UploadedFile[];
  selectedPeriod: SelectedPeriod;
  isValidFile: boolean;
  fileUploadError: UploadError;
  uploadedFileName: string;
  syncFieldsData: APIGetImportSyncFields["InterfaceData"];
  parsedFileData: ParsedFileData | undefined;
  mappedColumns: MappedColumns;
  requiredFieldsIds: number[];
  selectedInterface: SelectedInterface | undefined;
  isMapped: boolean;
  isValidationMappingError: boolean;
  validationError: string;
};

export const initialState: SyncToolState = {
  isAdmin: false,
  status: "idle",
  syncFiles: [],
  selectedPeriod: "LastWeek",
  isValidFile: false,
  fileUploadError: undefined,
  uploadedFileName: "",
  syncFieldsData: { SyncObjects: [], FileTypeDelimiter: [] },
  parsedFileData: undefined,
  mappedColumns: {},
  requiredFieldsIds: [],
  selectedInterface: undefined,
  isMapped: false,
  isValidationMappingError: false,
  validationError: "",
};

export const getSyncFileStatus = createAsyncThunk(
  "syncTool/getSyncFileStatus",
  async () => {
    const res = await api
      .get<APIGetSyncFileStatus>(URLS.GetSyncFileStatus)
      .then((res) => res.data);
    return res;
  }
);

export const getImportSyncFields = createAsyncThunk(
  "syncTool/getImportSyncFields",
  async () => {
    const res = await api
      .get<APIGetImportSyncFields>(URLS.GetImportSyncFields)
      .then((res) => res.data);
    return res;
  }
);

export const updateSyncMappingForInterface = createAsyncThunk(
  "syncTool/updateSyncMappingForInterface",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { syncTool: SyncToolState };
    const params: APIUpdateSyncMappingForInterfaceParams = {
      Interface: state.syncTool.selectedInterface?.name || "",
      mapFields: state.syncTool.mappedColumns,
    };
    await api.post(URLS.UpdateSyncMappingForInterface, params);
  }
);

export const validateSyncMappingForInterface = createAsyncThunk(
  "syncTool/validateSyncMappingForInterface",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { syncTool: SyncToolState };
    const params: APIValidateSyncMappingForInterface = {
      InterfaceType: state.syncTool.selectedInterface?.id || 0,
      clientDataSourceFields: state.syncTool.parsedFileData?.headers || [],
    };
    const resp = await api
      .post<APIValidateSyncMappingResponse>(
        URLS.ValidateSyncMappingForInterface,
        params
      )
      .then((res) => res.data);
    return resp;
  }
);

export const uploadSyncFile = createAsyncThunk(
  "syncTool/uploadSyncFile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { syncTool: SyncToolState };
    const { fileName, fileExt } = getFileNameAndExt(
      state.syncTool.uploadedFileName
    );
    const fileObjectRelation = state.syncTool.selectedInterface?.id;
    const numOfRecords = state.syncTool.parsedFileData?.numberOfRecords;
    const file = state.syncTool.parsedFileData?.file;
    const data = new FormData();
    if (file) {
      data.append("file", file);
      await api.post(
        `${URLS.UploadSyncFile}/${fileName}/${fileExt}/${fileObjectRelation}/${numOfRecords}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  }
);

export const getS3FileObject = createAsyncThunk(
  "syncTool/getS3FileObject",
  async (fileKey: string) => {
    const resp = await api
      .post<APIGetS3FileObjectResponse>(URLS.GetS3FileObject, { fileKey })
      .then((res) => res.data);
    return resp;
  }
);

export const getS3LogFileObject = createAsyncThunk(
  "syncTool/getS3LogFileObject",
  async (fileKey: string) => {
    const resp = await api
      .post<APIGetS3FileObjectResponse>(URLS.GetS3LogFileObject, { fileKey })
      .then((res) => res.data);
    return resp;
  }
);

const sliceSyncTool = createSlice({
  name: "sliceSyncTool",
  initialState: initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<SelectedPeriod>) => {
      state.selectedPeriod = action.payload;
    },
    setIsValidFile: (state, action: PayloadAction<boolean>) => {
      state.isValidFile = action.payload;
    },
    setFileUploadError: (state, action: PayloadAction<UploadError>) => {
      state.fileUploadError = action.payload;
    },
    setUploadedFileName: (state, action: PayloadAction<string>) => {
      state.uploadedFileName = action.payload;
    },
    resetUpload: (state) => {
      state.isValidFile = false;
      state.fileUploadError = undefined;
      state.uploadedFileName = "";
      state.selectedInterface = undefined;
      state.isMapped = false;
      state.isValidationMappingError = false;
    },
    setParsedFileData: (state, action: PayloadAction<ParsedFileData>) => {
      state.parsedFileData = action.payload;
    },
    setMappedColumns: (state, action: PayloadAction<MappedColumn>) => {
      const { id, name } = action.payload;
      if (!name) {
        delete state.mappedColumns[id];
      } else {
        state.mappedColumns[id] = name;
      }
    },
    resetMappedColumns: (state) => {
      const selectedInterface = state.selectedInterface;
      if (selectedInterface) {
        const tableFields = state.syncFieldsData[selectedInterface.name];
        const columns = {} as MappedColumns;
        tableFields.forEach(({ SyncDefinitionFieldID }) => {
          columns[SyncDefinitionFieldID] = null;
        });
        state.mappedColumns = columns;
      } else {
        state.mappedColumns = {};
      }
    },
    setRequiredFieldsIds: (state, action: PayloadAction<number[]>) => {
      state.requiredFieldsIds = action.payload;
    },
    setSelectedInterface: (
      state,
      action: PayloadAction<SelectedInterface | undefined>
    ) => {
      state.selectedInterface = action.payload;
    },
    setIsMapped: (state, action: PayloadAction<boolean>) => {
      state.isMapped = action.payload;
    },
    resetAll: () => initialState,
  },
  extraReducers: (builder) => {
    //getSyncFileStatus
    builder.addCase(getSyncFileStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSyncFileStatus.fulfilled, (state, { payload }) => {
      state.status = "success";
      if (payload.error && payload.error.ErrorMessage) {
        state.status = "error";
      } else {
        state.isAdmin =
          payload.Data.length > 0
            ? payload.Data.find(
                (item) => item.DisplayEName === "Show Mapping Option"
              )?.Value === "True"
            : false;
        state.syncFiles =
          payload.ResponseDataTable.length > 0
            ? payload.ResponseDataTable[0]
            : [];
      }
    });
    builder.addCase(getSyncFileStatus.rejected, (state) => {
      state.status = "error";
    });
    //getImportSyncFields
    builder.addCase(getImportSyncFields.fulfilled, (state, { payload }) => {
      state.syncFieldsData = payload.InterfaceData;
    });
    //validateSyncMappingForInterface
    builder.addCase(
      validateSyncMappingForInterface.fulfilled,
      (state, { payload }) => {
        state.isValidationMappingError = payload.error?.ErrorDescription
          ? true
          : false;
        state.validationError = payload.error?.ErrorDescription || "";
      }
    );
  },
});

export const {
  setSelectedPeriod,
  setIsValidFile,
  setFileUploadError,
  setUploadedFileName,
  resetUpload,
  setParsedFileData,
  setMappedColumns,
  resetMappedColumns,
  setRequiredFieldsIds,
  setSelectedInterface,
  setIsMapped,
  resetAll,
} = sliceSyncTool.actions;

export default sliceSyncTool.reducer;
