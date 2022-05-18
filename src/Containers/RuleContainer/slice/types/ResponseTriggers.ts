export interface ResponseTriggers {
  error?: any;
  Data?: any[];
  ResponseList?: ResponseList[];
  Response?: any;
  ResponseDictionary?: any;
  ResponseDictionaryDT?: any;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues?: any;
  ResponseDataTable?: any[];
}

export interface ResponseList {
  NotificationType?: number;
  StopReasonID: number;
  TriggerGroupID: number;
  IsActive: boolean;
  TriggerGroupName: string;
  TriggerRuleText: string;
  IntervalHour: number;
  GroupCreateUser: string;
  GroupCreateUserID: number;
  CreateDate: string;
  LastRunTime: string;
  IntervalMinute: number;
  AssigneeGroup: number;
  IntervalType: IntervalType;
  Days: number[];
  TaskModuleTriggerID: number[];
  TriggerType: number;
  TriggerMultiReason: TriggerMultiReason[];
  ConditionType: number;
}

export enum IntervalType {
  Daily = "daily",
  Empty = "",
  Monthly = "monthly",
  Weekly = "weekly",
  HourlyCustom = "hourlyCustom",
}

export interface TriggerMultiReason {
  ID: number;
  TriggerID: number;
  StopReasonID: number;
}
