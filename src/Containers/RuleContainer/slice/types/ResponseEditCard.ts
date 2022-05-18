export interface ResponseEditCard {
  error?: any;
  Data?: any[];
  ResponseList?: ResponseEditList[];
  Response?: any;
  ResponseDictionary?: any;
  ResponseDictionaryDT?: any;
  ResponseExpandoObjectDictionary?: any;
  ResponseDictionaryValues?: any;
  ResponseDataTable?: any[];
}

export interface ResponseEditList {
  AssigneeGroup: number;
  DayInMonth: number[];
  DayInWeek: number[];
  Days: number[];
  GroupCreateUser: string;
  GroupCreateUserDefinition: number;
  GroupCreateUserID: number;
  IntervalHour: number;
  IntervalMinute: number;
  IntervalType: IntervalType;
  MachineArray: string;
  NotificationType: number;
  TaskModuleTriggerID: number[];
  TaskNotificationAssignee: number;
  NotificationAssigneeGroup: number;
  TaskNotificationCreateUser: string;
  TaskNotificationMachine: number;
  TaskNotificationText: string;
  TriggerGroupID: number;
  TriggerGroupName: string;
  TriggerRuleText: string;
  taskmoduletriggerid: number;
  tasklevel: number;
  TaskLevelObjectID: number;
  EstimatedExecutionTime: number;
  Priority: number;
  TaskSteps: TaskSteps[];
  Text: string;
  StopReasonID: number;
  Assignee: number;
  Subject: number;
  Subsubject: number;
  TriggerMultiReason: TriggerMultiReason[];
  TriggerCondition: TriggerCondition[];
  Date: string;
  MaintenanceEntityID: number;
  MaintenanceNote: string;
  MaintenanceReason: number;
  MaintenanceType: number;
}

export interface TaskSteps {
  text: string;
  isopen: true;
  displayorder: number;
  isactive: boolean;
}

export interface TriggerMultiReason {
  ID: number;
  TriggerID: number;
  StopReasonID: number;
}

export interface TriggerCondition {
  Name: string;
  Sign: string;
  Value: string;
  FieldType: string;
  Condition: string;
  DisplayOrder: number;
  ID: number;
  Interval: string;
  MachineID: number;
  ParameterID: number[];
  TimeInterval: number;
  ConditionType: number;
}

export enum IntervalType {
  Daily = "daily",
  Empty = "",
  Monthly = "monthly",
  Weekly = "weekly",
}
