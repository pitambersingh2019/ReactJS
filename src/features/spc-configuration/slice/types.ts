export interface ResponseSPCTestData {
  Departments: Department[];
  FunctionSucceed: boolean;
  LeaderRecordID: number;
  TestsText: TestText[];
  error: string | null;
}

export interface TestText {
  TestID: number;
  TestText: string;
}

export interface SPCTestState {
  Departments: Department[];
  TestsText: TestText[];
  loading: boolean;
  Step: 1 | 2 | 3;
  SelectedMachines: SelectedMachine[];
  TreeDepartments: TreeData[];
  TreeSelectedMachines: TreeData[];
  DetailMachine?: TreeData;
  SPCTemplates?: any;
  ApiCallEnd: boolean | undefined;
}

export interface Department {
  DepartmentID: number;
  DepartmentName: string;
  Machines: Machine[];
}

export interface Machine {
  MachineID: number;
  MachineName: string;
  SPCControllerFields: SPCControllerField[];
}

export interface SPCControllerField {
  ControllerFieldID: number;
  ControllerFieldName: string;
  SPCLimitsBySigmas: number;
  SPCBySamplesAmount: number;
  IsSPCValue: boolean;
  SPCTestParams: SPCTestParam[];
}

export interface SPCTestParam {
  TestID: number;
  TestIsActive: boolean;
  TestParam: number;
}

export interface ControllerField {
  ControllerFieldID: number;
  ControllerFieldName: string;
  IsSPCValue: boolean;
  SPCBySamplesAmount: number;
  SPCLimitsBySigmas: number;
  SPCTestParams: TestParam[];
  SPCActive?: boolean;
}

export interface TestParam {
  TestID: number;
  TestIsActive: boolean;
  TestParam: number;
}

export interface TreeData {
  id: number;
  name: string;
  parentID: number | null;
  SPCControllerFields?: ControllerField[];
  subOptions: TreeData[];
}

export interface SelectedMachine {
  id: number;
  name: string;
  parentID: number | null;
}

export interface ResponseSPCTemplateData {
  Data: any[];
  Response: any | null;
  ResponseDataTable: any[];
  ResponseDictionary: any | null;
  ResponseDictionaryDT: any | {};
  ResponseDictionaryValues: { Templates: SPCTemplate[] };
  ResponseExpandoObjectDictionary: any | null;
  ResponseList: any | null;
  error: any | null;
}

export interface SPCTemplate {
  TemplateID: number;
  TemplateName: string;
  SPCTestParams: TestParam[];
}

export interface SaveSPCTemplateReq {
  TemplateID: number;
  TemplateName: string;
  UpsertType: 1 | 2 | 3;
  Params: { SPCTestParams: TestParam[] };
}

export interface SaveAPIRes {
  FunctionSucceed: boolean;
  LeaderRecordID: number;
  error: string | null;
}
