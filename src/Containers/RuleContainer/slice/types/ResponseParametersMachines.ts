export interface ResponseParametersMachines {
  error?: any;
  Data?: any[];
  ResponseList?: any;
  Response?: any;
  ResponseDictionary?: any;
  ResponseDictionaryDT?: any;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues: ParametersData;
  ResponseDataTable?: any[];
}

export interface ParametersData {
  [key: string]: ResponseParametersList[];
}

export interface ResponseParametersList {
  id: number;
  machineid: number;
  fieldname: string;
  name: string;
  isspcvalue: boolean;
}
