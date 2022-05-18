export interface IDefinedKPIs {
  DecimalsRound: number;
  DepartmentID: number;
  DepartmentName: string;
  DisplayOrder: number;
  DisplayType: number;
  DisplayTypeName: string;
  Filter: string;
  Formula: string;
  FormulaID: number;
  FormulaName: string;
  IsResultValid: boolean;
  MainKPI: number;
  MaxValue: number;
  MaxValueDay: number;
  MaxValueMonth: number;
  MaxValueShift: number;
  MaxValueWeek: number;
  MinValue: number;
  MinValueDay: number;
  MinValueMonth: number;
  MinValueShift: number;
  MinValueWeek: number;
  IsActive: any;
  Result: any;
  CreationDate: string;
}

export interface IMainKPI extends IDefinedKPIs {
  NumberOfKPIs: number;
}

export interface ITimePeriods {
  ID: number;
  PeriodName: string;
}

interface ITeplateResponse {
  Data: any;
  Response: any;
  ResponseDataTable: any;
  ResponseDictionary: any;
  ResponseDictionaryDT: any;
  ResponseDictionaryValues: any;
  ResponseExpandoObjectDictionary: any;
  ResponseList: any;
  error: any;
}

export interface IColumn {
  ColumnName: string;
  DisplayName: string;
}

export interface IDataMainKPI extends ITeplateResponse {
  ResponseList: IMainKPI[];
}

export interface IDataParamsColumn extends ITeplateResponse {
  ResponseDictionary: {
    Data: IColumn[];
  };
}

export interface IDataDefinedKPIs extends ITeplateResponse {
  ResponseList: IDefinedKPIs[];
}

export interface IDataTimePeriods extends ITeplateResponse {
  ResponseDictionaryDT: {
    Body: ITimePeriods[];
  };
}

export interface IDepartmet {
  Id: number;
  LName: string;
  EName: string;
  AllowShiftManagerLogin: boolean;
}
export interface IDataGetDepartments {
  DepartemntMachineGroups: any;
  DepartemntMachineLines: any;
  DepartmentMachine: any;
  ErrorCode: any;
  ErrorDescription: any;
  ErrorMessage: any;
  FunctionSucceed: any;
  LeaderRecordID: number;
  ProductionStatus: any;
  UserGroupPermission: any;
  departments: IDepartmet[];
  error: any;
}

export interface IDataChangeKPI {
  FunctionSucceed: boolean;
  LeaderRecordID: number;
  error: any;
}

export type TFilterMenu =
  | "Machines"
  | "Shift Name"
  | "Job Definition"
  | "Product Group"
  | "Products"
  | "Mold Group"
  | "Molds"
  | "Users"
  | "Clients";
export interface IFilterPoint {
  CustomKPIsFilter: boolean;
  DisplayOrder: number;
  FilterName: string;
  ID: number;
  Name: TFilterMenu;
  NameDictionaryID: number;
  ReportID: any;
  Type: any;
  DisplayName: string;
}

export interface IFilterMachine {
  ID: number;
  LineEName: string;
  LineID: number;
  LineLName: string;
  MachineGroupID: number;
  MachineGroupLName: string;
  MachineGroupName: string;
  MachineLName: string;
  MachineName: string;
  MachineType: number;
  MachineTypeName: string;
}

export interface IShiftsDef {
  ShiftName: string;
  ShiftType: number;
  ShiftTypeName: string;
  WDay: number;
}

export interface IJobDef {
  DisplayName: string;
  ename: string;
  id: number;
  lname: string;
}

export interface IResponseFilter {
  Filters: IFilterPoint[];
  Machines: IFilterMachine[];
  ShiftDef: IShiftsDef[];
  ERPJobDef: IJobDef[];
  [key: string]: any;
}

export interface IDataGetInsightFilters extends ITeplateResponse {
  ResponseDictionary: IResponseFilter;
}

interface IColumnsName {
  CustomLinkItem: boolean;
  DigitsNumber: any;
  DisplayEName: string;
  DisplayHName: string;
  DisplayType: string;
  ExternalLink: boolean;
  FieldName: string;
  FormID: number;
  OpenInNewTabOnly: boolean;
  ReportColWidth: string;
  linkitem: string;
}

export interface IRowData {
  ID: number;
  [key: string]: number | string | null;
}

export type IDataGetResultSearchFields = [
  IColumnsName[],
  IRowData[],
  any[],
  any[]
];

export interface IKPISave {
  MainKPI: boolean;
  FormulaID: number;
  FormulaName: string;
  Formula: string;
  Filter: string;
  MinValue: number;
  MaxValue: number;
  MinValueShift: number;
  MaxValueShift: number;
  MinValueDay: number;
  MaxValueDay: number;
  MinValueWeek: number;
  MaxValueWeek: number;
  MinValueMonth: number;
  MaxValueMonth: number;
  IsActive: boolean;
  DecimalsRound: number;
  DepartmentID: number;
  DisplayType: number;
}

interface TDisplayOrders {
  key: number;
  value: number;
}

export type TSetDiaplayOrder = TDisplayOrders[];

export interface IFilter {
  GroupID: number;
  GroupName: string;
  ID: number;
  Name: string;
}

export interface IFilterLabels {
  MachineIdFilter: IFilter[];
  ShiftNameFilter: IFilter[];
  ERPJobDefFilter: IFilter[];
  ProductGroupFilter: IFilter[];
  ProductIdFilter: IFilter[];
  MoldGroupFilter: IFilter[];
  MoldIdFilter: IFilter[];
  UserIdFilter: IFilter[];
  ClientIdFilter: IFilter[];
  IsEndOfLineFilter: IFilter[];
}

export interface IGetCustomKPIsFilterLabels extends ITeplateResponse {
  ResponseDictionaryValues: {
    FilterLabels: IFilterLabels;
  };
}

interface IDataFormulaName {
  FormulaID: number;
  FormulaName: string;
}

export interface IDataGetName {
  DepartmentID: number;
  DepartmentName: string;
  Formulas: IDataFormulaName[];
}

export interface IGetCustomKPINames extends ITeplateResponse {
  ResponseList: IDataGetName[];
}
