export interface Subjects {
  ID: number;
  Name: string;
  IsActive: boolean;
  DisplayName: string;
}

export interface Level {
  ID: number;
  Name: string;
  DisplayName: string;
}

export interface Priority {
  ID: number;
  Name: string;
  DisplayName: string;
}

export interface SubSubjects {
  ID: number;
  DisplayName: string;
  SubjectID: number;
}

interface ResponseDictionaryDT2 {
  Subjects: Subjects[];
  Level: Level[];
  Priority: Priority[];
  SubSubjects: SubSubjects[];
}

export interface ResponseGetTasksObjects {
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
