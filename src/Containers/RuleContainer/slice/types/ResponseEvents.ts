export interface ResponseEvents {
  EventsAndGroups?: EventsAndGroup[];
  error?: null;
  events?: any[];
}

export interface EventsAndGroup {
  ColorID: null;
  DepartmentID: number;
  DictionaryID: number;
  DisplayInOpApp: boolean;
  DisplayOrder: number;
  EName: string;
  ERPID: null;
  ID: number;
  IconID: null;
  IsActive: boolean;
  IsSystem: boolean;
  LName: string;
  MachineID: number;
  Machines: null;
  NumOfMachines: number;
  Reasons: EventsAndGroup[] | null;
  TargetPC: null;
  UpsertType: number;
  EventDefinitionID?: number;
  EventGroupID?: number;
}
