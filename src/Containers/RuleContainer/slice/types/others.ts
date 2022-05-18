export interface CardsInterface {
  name: string;
  triggerText: string;
  TriggerGroupID: number;
  IsActive: boolean;
  TaskModuleTriggerID: number[];
  NotificationType?: number;
  //ShowCard: boolean;
  GroupCreateUserID: number;
  stopReasonId: number;
  intervalType: string;
  GroupCreateUser: string;
  CreateDate: string;
  LastRunTime: string;
  TriggerType: number;
  ConditionType: number;
}

export interface setActiveTriggerInterface {
  ID?: number;
  Name?: string;
  RuleText?: string;
  IsActive?: 0 | 1;
}

export interface DeleteTriggerInterface {
  ID: number;
  TriggerType: number;
  Name: string;
}

export enum VIEW_ROWS_GRID {
  GRID = "Grid",
  ROWS = "Rows",
}

export enum ConditionType {
  GENERAL = 1,
  PARAMETERDEVIATION = 2,
  PARAMETERDEVIATIONSPC = 3,
}
