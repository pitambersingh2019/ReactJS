interface User {
  ID: number;
  DisplayName: string;
}
interface ResponseDictionaryDT {
  Users: User[];
}
export interface ResponseUserForTask {
  error?: any;
  Data?: any[];
  ResponseList?: any;
  Response?: any;
  ResponseDictionary?: any;
  ResponseDictionaryDT?: ResponseDictionaryDT;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues?: any;
  ResponseDataTable?: any[];
}
