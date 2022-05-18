interface Department {
  ID: number;
  LName: string;
  EName: string;
}

interface Machine {
  ID: number;
  TypeID: number;
  MachineName: string;
  MachineLName: string;
  Department: number;
}

interface Job {
  ID: number;
  ERPJobID: string;
  MachineID: number;
  ProductName: string;
}

interface UserDefinition {
  ID: number;
  HName: string;
  EName: string;
}

interface Mold {
  ID: number;
  LName: string;
  EName: string;
}

interface Auxiliary {
  ID: number;
  Name: string;
  ERPID: string;
}

interface ResponseDictionaryDT2 {
  Departments: Department[];
  Machines: Machine[];
  Jobs: Job[];
  UserDefinitions: UserDefinition[];
  Molds: Mold[];
  Auxiliaries: Auxiliary[];
}

export interface ResponseTaskLevelObject {
  error?: any;
  Data?: any[];
  ResponseList?: any;
  Response?: any;
  ResponseDictionary?: any;
  ResponseDictionaryDT?: ResponseDictionaryDT2;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues?: any;
  ResponseDataTable?: any[];
}
