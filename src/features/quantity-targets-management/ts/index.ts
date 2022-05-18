export type APIUnitsTargetValues = {
  error: {
    ErrorMessage?: string;
  };
  ResponseDictionaryValues: {
    AllFactory: DepartmentTarget[];
  };
};

type Fixed = 0 | 1;

export type DepartmentTarget = {
  DepartmentID: number;
  DepartmentName: string;
  IsFixedDepartment: Fixed;
  DepartmentPeriodTargets: PeriodTarget[];
  DepartmentMachinesPeriodTargets: DepartmentMachinesPeriodTarget[] | null;
};

export type PeriodTarget = {
  PeriodID: number;
  PeriodName: string;
  TargetValue: number;
};

export type DepartmentMachinesPeriodTarget = {
  MachineID: number;
  MachineName: string;
  IsFixedMachine: Fixed;
  MachinePeriodTargets: PeriodTarget[];
};

export type APIParamsUnitsTargetValues = {
  recurringPeriod: SelectedTimeRange;
  manualPeriod: number;
  periodStart: {}[];
};

export enum SelectedTimeRange {
  Shift = 1,
  Day,
  Week,
  Month,
}

export type SelectedPeriod = {
  name: string;
  checked: boolean;
};

export enum Checked {
  All,
  None,
  Half,
}
