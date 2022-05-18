export interface ResponseMaintenance {
  error?: any;
  Data?: any[];
  ResponseList?: any;
  Response?: any;
  ResponseDictionary?: ResponseDictionary;
  ResponseDictionaryDT?: any;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues?: any;
  ResponseDataTable?: any[];
}

interface ResponseDictionary {
  MaintenanceTypes: MaintenanceTypes[];
  MaintenaceReasons: MaintenaceReasons[];
  Machines: Machines[];
  Molds: Molds[];
  Auxiliarys: Auxiliarys[];
}

interface MaintenanceTypes {
  MaintenanceType: number;
  SysName: string;
  MaintenanceTypeName: string;
}

interface MaintenaceReasons {
  MaintenanceReason: number;
  MaintenanceType: number;
  MaintenanceReasonName: string;
}

interface Auxiliarys {
  AuxiliaryID: number;
  AuxiliaryName: string;
}

interface Molds {
  MoldID: number;
  MoldName: string;
}

interface Machines {
  MachineID: number;
  MachineName: string;
}
