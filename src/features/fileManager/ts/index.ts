export type APIGetSyncFileStatus = {
  error: {
    ErrorCode: number;
    ErrorMessage?: string;
  };
  Data: {
    ID: number;
    DisplayEName: string;
    DisplayLName: string | null;
    Value: "False" | "True";
    DisplayOrder: number;
    UrlTarget: string | null;
  }[];
  ResponseDataTable: UploadedFile[][];
};

export type UploadedFile = {
  ID: number;
  FileName: string;
  UploadDate: string;
  SyncObjectID: number;
  NumOfRecords: number;
  Status: Status;
  UploadBy: number;
  Path: string;
  LogPath: string | null;
  OriginalFileName: string | null;
  statusname: string;
  syncobjectname: string;
  uploadedbyusername: string;
};

export const PERIODS = [
  "LastWeek",
  "LastMonth",
  "Last3Months",
  "Last6Months",
] as const;

export type SelectedPeriod = typeof PERIODS[number];

export type LastFetch = {
  time: string;
};

export enum Status {
  PENDING = 1,
  IN_PROCESS,
  SYNCED,
  FAILED,
}

export type UploadError = "size" | "type" | undefined;

export type FieldType =
  | "string"
  | "int"
  | "datetime"
  | "bool"
  | "decimal"
  | "float"
  | "Float";

export type IterfaceDataItem = {
  AllowNull: boolean;
  DataType: string;
  Description: string | null;
  FieldMaxSize: number | null;
  FieldSize: number | null;
  ID: number;
  IsMandatory: boolean;
  MandatoryFields: string;
  ObjectID: number;
  SyncDefFieldID: number;
  SyncDefinitionFieldID: number;
  SyncInterface: string;
  Type: FieldType;
  sourcefieldname: string;
};

type SyncObject = { ID: number; Name: string };

type SyncObjectKeys = keyof SyncObject;
type SyncObjectValues = SyncObject[SyncObjectKeys];

type FileTypeDelimiter = {
  ID: number;
  FileType: "txt" | "csv";
  Delimiter: "Tab" | ",";
};

export type APIGetImportSyncFields = {
  error: {
    ErrorCode: number;
    ErrorMessage?: string;
  };
  InterfaceData: {
    SyncObjects: SyncObject[];
    FileTypeDelimiter: FileTypeDelimiter[];
  } & {
    [key in SyncObjectValues]: IterfaceDataItem[];
  };
};

export type ParsedFileData = {
  headers: string[];
  numberOfRecords: number;
  file: File;
};

export type MappedColumns = {
  [key: number]: string | null;
};

export type MappedColumn = {
  id: number;
  name: string | undefined;
};

export type APIUpdateSyncMappingForInterfaceParams = {
  Interface: string;
  mapFields: { [key: string]: string | null };
};

export type SelectedInterface = {
  id: number;
  name: string;
};

export type APIValidateSyncMappingForInterface = {
  InterfaceType: number;
  clientDataSourceFields: string[];
};

export type APIValidateSyncMappingResponse = {
  error: {
    ErrorCode: number;
    ErrorDescription?: string;
  } | null;
};

export type APIGetS3FileObjectResponse = {
  error: { ErrorMessage: string } | null;
  fileURL: string;
};
