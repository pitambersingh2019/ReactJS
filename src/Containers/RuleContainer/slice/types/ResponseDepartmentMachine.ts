interface Key {
  AllowShiftManagerLogin: boolean;
  EName: string;
  Id: number;
  LName: string;
}

interface Key2 {
  MachineGroupID: number;
  MachineGroupName: string;
}

interface Value2 {
  DisplayOrder: number;
  Id: number;
  MachineLName: string;
  MachineName: string;
  MachineStatus: number;
  MachineStatusColor?: any;
  WorkerName?: any;
  CalendarID: number;
  ClientName?: any;
  CurrentJobID: number;
  ErpJobID?: any;
  IsEndOfLine: boolean;
  IsSaveJobsGantt: boolean;
  LineID: number;
  MachineStatusName?: any;
  ProductCatalog?: any;
  ProductName?: any;
  StatusTime: number;
  TypeID: number;
  LineName: string;
  MachineGroupID: number;
  MachineGroupName: string;
}

interface Value {
  [x: string]: any;
  Key: Key2;
  Value: Value2[];
}

interface DepartemntMachineGroup {
  Key: Key;
  Value: DepartemntMachineGroupValue[];
}

export interface PurpleKey {
  Id: any;
  MachineGroupID: number;
  MachineGroupName: string;
}

interface DepartemntMachineGroupValue {
  Key: PurpleKey;
  Value: Value[];
}

interface Key3 {
  AllowShiftManagerLogin: boolean;
  EName: string;
  Id: number;
  LName: string;
}

interface Key4 {
  LineID: number;
  LineName: string;
}

interface Value4 {
  DisplayOrder: number;
  Id: number;
  MachineLName: string;
  MachineName: string;
  MachineStatus: number;
  MachineStatusColor?: any;
  WorkerName?: any;
  CalendarID: number;
  ClientName?: any;
  CurrentJobID: number;
  ErpJobID?: any;
  IsEndOfLine: boolean;
  IsSaveJobsGantt: boolean;
  LineID: number;
  MachineStatusName?: any;
  ProductCatalog?: any;
  ProductName?: any;
  StatusTime: number;
  TypeID: number;
  LineName: string;
  MachineGroupID: number;
  MachineGroupName: string;
}

interface Value3 {
  Key: Key4;
  Value: Value4[];
}

interface DepartemntMachineLine {
  Key: Key3;
  Value: DepartemntMachineLineValue[];
}

interface DepartemntMachineLineValue {
  Key: Key4;
  Value: Value3[];
}

interface Key5 {
  AllowShiftManagerLogin: boolean;
  EName: string;
  Id: number;
  LName: string;
}

interface Value5 {
  DisplayOrder: number;
  Id: number;
  MachineLName: string;
  MachineName: string;
  MachineStatus: number;
  MachineStatusColor?: any;
  WorkerName?: any;
  CalendarID: number;
  ClientName?: any;
  CurrentJobID: number;
  ErpJobID?: any;
  IsEndOfLine: boolean;
  IsSaveJobsGantt: boolean;
  LineID: number;
  MachineStatusName?: any;
  ProductCatalog?: any;
  ProductName?: any;
  StatusTime: number;
  TypeID: number;
}

interface DepartmentMachine {
  Key: Key5;
  Value: Value5[];
}

export interface ResponseDepartmentMachine {
  FunctionSucceed?: boolean;
  LeaderRecordID?: number;
  error?: any;
  DepartemntMachineGroups?: DepartemntMachineGroup[];
  DepartemntMachineLines?: DepartemntMachineLine[];
  DepartmentMachine?: DepartmentMachine[];
  ErrorCode?: any;
  ErrorDescription?: any;
  ErrorMessage?: any;
  ProductionStatus?: any;
  UserGroupPermission?: any;
  departments?: any[];
}
