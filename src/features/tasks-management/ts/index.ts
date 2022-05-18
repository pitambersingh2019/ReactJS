export type APIStatus = "idle" | "loading" | "success" | "error";

export type APITasksProgress = {
  data: {
    ResponseDictionaryDT: {
      TaskProgress: Task[];
    };
    error: {
      ErrorMessage?: string;
    };
  };
};

export type APITasks = {
  ResponseDictionaryValues: {
    TaskProgress: Task[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type APIUsers = {
  ResponseDictionaryDT: {
    Users: UserForTask[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type UserForTask = {
  ID: number;
  DisplayName: string;
};

export type Task = {
  TaskPriorityTrans: string;
  TaskPriorityID: TaskPriority;
  TaskStatus: Status;
  StatusName: keyof typeof Status;
  TaskID: number;
  NumOfOpenSubTasks: number;
  HasSubTasks: number;
  Assignee: number;
  AssigneeDisplayName: string;
  SubjectTrans: string;
  Text: string;
  LevelName: string;
  LName: string;
  EName: string;
  EndTimeException: 0 | 1;
  ID: number;
  HistoryID: number;
  TaskCreateUser: number;
  TaskCreateDate: string;
  CreateUserName: string;
  SubjectID: number;
  TaskLevel: TaskLevel;
  TaskStartTimeTarget: string;
  TaskEndTimeTarget: string;
  ObjectID: number;
  HistoryCreateDate: string;
  EstimatedExecutionTime: number;
  NumOfComments: number;
  NumOfFiles: number;
  TaskSteps: SubTask[];
  SubSubjects?: SubSubject[];
  isEmpty?: boolean;
  SubjectHeb: string | null;
  Subjecteng: string | null;
  Subjectrus: string | null;
  Subjectspn: string | null;
  Subjectarb: string | null;
  Subjectchn: string | null;
  Subjectned: string | null;
  Subjectger: string | null;
  Subjectfre: string | null;
  Subjectukr: string | null;
  Subjectita: string | null;
  Subjecthun: string | null;
  Subjectprt: string | null;
  Subjectpol: string | null;
  Subjectgre: string | null;
  Subjectrum: string | null;
};

export enum Status {
  Unassigned = 1,
  "To Do",
  "In Progress",
  Done,
  Canceled,
}

export enum TaskLevel {
  Factory = 1,
  Department,
  Machine,
  Job,
  UserGroup,
  Mold,
  Auxiliary,
}

export enum TaskPriority {
  Low = 1,
  Medium,
  High,
}

export type GroupedTasks = {
  [key: string]: Task[];
};

export type CreateTaskParams = {
  task: {
    ID?: number;
    HistoryID?: number;
    CreateUser?: number;
    Subject?: number;
    SubSubjects?: number[] | null;
    Text?: string;
    TaskLevel?: TaskLevel;
    TaskLevelObjectID?: number | null;
    Priority?: TaskPriority;
    Assignee?: number;
    StartTimeTarget?: string | null;
    EndTimeTarget?: string | null;
    SourceTaskCreationPlatform?: number;
    Status?: Status;
    TaskSteps?: SubTask[];
    EstimatedExecutionTime?: number;
  };
  isDateModified: boolean;
};

export type SortableProps =
  | "TaskStartTimeTarget"
  | "HistoryCreateDate"
  | "TaskEndTimeTarget"
  | "TaskPriorityID"
  | "AssigneeDisplayName"
  | "TaskLevel";

export type SortOption = {
  name: SortableProps;
  value: string;
};

export type Subject = {
  ID: number;
  Name: string;
  IsActive: boolean;
  DisplayName: string;
};

export type Level = {
  ID: number;
  Name: string;
  DisplayName: string;
};

export type SubSubject = {
  SubSubjectID: number;
  SubjectID: number;
  TaskID: number;
  TaskSubSubjectID: number;
  Text: string;
};

export type APISubSubject = {
  ID: number;
  SubjectID: number;
  DisplayName: string;
};

export type APITaskObjects = {
  ResponseDictionaryDT: {
    Subjects: Subject[];
    Level: Level[];
    SubSubjects: APISubSubject[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type Department = {
  ID: number;
  LName: string;
  EName: string;
};

export type Machine = {
  ID: number;
  TypeID: number;
  MachineName: string;
  MachineLName: string;
  Department: number;
};

export type Job = {
  ID: number;
  ERPJobID: string;
  MachineID: number;
};
export type UserDefinition = {
  ID: number;
  HName: string;
  EName: string;
};

export type Mold = {
  EName: string;
  ID: number;
  LName: string;
};

export type Auxiliary = {
  ERPID: string;
  ID: number;
  Name: string;
};

export type APITaskLevelObjects = {
  ResponseDictionaryDT: {
    Departments: Department[];
    Machines: Machine[];
    Jobs: Job[];
    UserDefinitions: UserDefinition[];
    Molds: Mold[];
    Auxiliaries: Auxiliary[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type APITaskSteps = {
  ResponseDictionaryDT: {
    TaskSteps: SubTask[];
  };
  error: {
    ErrorMessage?: string;
  };
};

export type SubTask = {
  ID: number;
  TaskID?: number;
  Text: string;
  IsOpen: boolean;
  DisplayOrder?: number;
  CreateDate?: string;
  ChangeDate?: string;
  DueDate?: string;
};

export type MachineIdName = {
  Id: number;
  MachineName: string;
};

type MachineGroup = {
  Key: {
    AllowShiftManagerLogin: boolean;
    EName: string;
    Id: number;
    LName: string;
  };
  Value: {
    Key: { MachineGroupID: number; MachineGroupName: string };
    Value: MachineIdName[];
  }[];
};

export type APIDepartmentMachine = {
  DepartemntMachineGroups: MachineGroup[]; //typo on the backend
  error: {
    ErrorMessage?: string;
  };
};

export type TaskLevelExcludeFactory = Exclude<TaskLevel, TaskLevel.Factory>;

export type Filter = {
  FilterName: string;
  Subjects: {
    [key: number]: boolean;
  };
  OnlyLate: boolean;
  Priority: Record<TaskPriority, boolean>;
  AssigneeDisplayName: {
    [key: string]: boolean;
  };
  TaskObject: {
    [key in TaskLevelExcludeFactory]: { [key: number]: boolean };
  };
  Status: Record<Status, boolean>;
  FilterID: number;
  doneCancelLastXDays: number;
};

export type APIFilter = {
  FilterName: string;
  FilterID: number;
  FilterTemplate: string;
};

export type APISavedFilters = {
  Data: APIFilter[];
  error: {
    ErrorMessage?: string;
  };
};

export type APICreateTask = {
  error: {
    ErrorMessage?: string;
  };
  LeaderRecordID: number;
};

export enum Checked {
  All,
  None,
  Half,
}

export type ActiveFilters = {
  showOverdueTasks: boolean | undefined;
  statuses: Record<Status, boolean> | undefined;
  priorityLevels: Record<TaskPriority, boolean> | undefined;
  subjects: { [key: number]: boolean } | undefined;
  assignees: { [key: string]: boolean } | undefined;
  machines: { [key: number]: boolean } | undefined;
  departments: { [key: number]: boolean } | undefined;
  userGroups: { [key: number]: boolean } | undefined;
};

export enum TasksPermissionsLevel {
  Level1 = 2,
  Level2 = 1,
  Level3 = 0,
}
