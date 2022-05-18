import { Item } from "../../../Component/DesignSystem/DropDown/types";

export type Display = {
  id: number;
  name: string;
  selectedMachine: Item | undefined;
  selectedParam: Item | undefined;
};

export type Machine = {
  DepartmentName: string;
  MachineID: number;
  MachineName: string;
};

export type Param = {
  MachineID: number;
  FieldID: number;
  FieldName: string;
  FieldDisplayName: string;
};

export type APIParams = {
  ResponseDictionary: {
    Machines: Machine[];
    MachinesParams: Param[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type JobDetails = {
  ERPJobID: string;
  JobID: number;
  ProductCatalogID: string;
  ProductName: string;
  StartTime: string;
};

export type PCGraphData = {
  machineId: number;
  paramName: string;
  machineDisplayName: string;
  paramDisplayName: string;
  isSecondaryAxis: boolean;
  showParamLim: boolean;
  data: {
    Details: JobDetails[];
    Graph: {
      Job: number;
      RecordTime: string;
      LValue: number | null;
      HValue: number | null;
      targetValue: number | null;
      JobStartTime: string;
      [key: Param["FieldName"]]: number | string | null;
    }[];
  };
};

export type APIPCGraphData = PCGraphData["data"];

export type PCGraphDataParams = {
  chartName: string;
  seriesParams: PCGraphDataParam[];
};

export type PCGraphDataParam = {
  machineId: number;
  paramName: string;
  machineDisplayName: string;
  paramDisplayName: string;
  isSecondaryAxis: boolean;
  showParamLim: boolean;
  params: {
    MachineID: number;
    ParameterName: string;
    endTime: string;
    startTime: string;
    Current: 1 | 2 | 6 | 0; //Current Shift - 1, Current Day - 2, Current Job - 6, other - 0
  };
};

export type PCChart = {
  [chartName: string]: PCGraphData[];
};

export const isPCDisplay = (
  display: PCDisplay | Display
): display is PCDisplay => {
  return (display as PCDisplay).PCParams !== undefined;
};

export type APIDashboards = {
  error: {
    ErrorMessage?: string;
  };
  ResponseDictionaryValues: {
    CurrentUserDashboards: Dashboard[];
    OtherUsersDashboards: Dashboard[];
  };
};

export type Dashboard = {
  DashboardID: number;
  DashboardName: string;
  DashboardCreatorName: string;
  DashboardCreatorID: number | undefined;
  PCDisplays: PCDisplay[];
};

export type PCDisplay = {
  DisplayID: number;
  DisplayName: string;
  PCParams: PCParam[];
  UpsertType: 1 | 2 | 3 | 0; //DELETE = 1, INSERT = 2, UPDATE = 3
};

export type PCParam = {
  ParamID: number;
  MachineID: number;
  MachineName: string;
  ParamName: string;
  ShowParamLimits: boolean;
  IsSecondaryAxis: boolean;
  UpsertType: 1 | 2 | 3 | 0;
  ParamDisplayName: string;
  DepartmentName: string;
};

export type APISaveDashboard = {
  error: {
    ErrorMessage?: string;
  };
  LeaderRecordID: number;
};

export type APIDuplicateDashboard = {
  error: {
    ErrorMessage?: string;
  };
  LeaderRecordID: number;
};
