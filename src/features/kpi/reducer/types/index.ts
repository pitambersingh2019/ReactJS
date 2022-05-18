import { IDataGetName } from "../../api/types";
import { TDisplay, TGuageType } from "../../create/types";

export type TTimePeriod = 1 | 2 | 3 | 4 | 5;

export type TStep = 1 | 2 | 3 | 4;

export interface dataIKPI {
  isResultValid: boolean;
  isPrimary: boolean;
  DecimalsRound: number;
  Formula: string;
  FormulaName: string;
  DisplayType: number;
  Filter: string;
  DisplayOrder: number;
  MaxValue: number;
  MaxValueDay: number;
  MaxValueMonth: number;
  MaxValueShift: number;
  MaxValueWeek: number;
  MinValue: number;
  MinValueDay: number;
  MinValueMonth: number;
  MinValueShift: number;
  MinValueWeek: number;
  Result: number;
  isActive: boolean;
  FormulaID: number;
  creationDate: string;
}

export interface ISearchKpis {
  departmentName?: string;
  numberOfKPIs?: number | string;
}

export interface IKPI {
  isLoading: boolean;
  data: dataIKPI[];
}

export interface dataMainKPI {
  DepartmentName: string;
  DepartmentID: number;
  primary: number;
  NumberOfKPIs: number;
  primaryKPI: dataIKPI;
  kpis: IKPI;
}

export interface mainKPI {
  isLoading: boolean;
  data: dataMainKPI[];
}

export interface ICraeteState {
  isPrimary: boolean;
  isActive: boolean;
  digists: number;
  formulaID: number;
  DepartmentName: string;
  KPIName: string;
  displayType: TDisplay;
  gaugeType: TGuageType | "";
  filter: string;
  formula: string;
  displayOrder: number;
  MaxValue: number;
  MaxValueDay: number;
  MaxValueMonth: number;
  MaxValueShift: number;
  MaxValueWeek: number;
  MinValue: number;
  MinValueDay: number;
  MinValueMonth: number;
  MinValueShift: number;
  MinValueWeek: number;
  departmentID: number;
}

export interface IInitialState {
  mainKPIs: mainKPI;
  openKPIs: number[];
  nameAllKPIs: IDataGetName[];
  timePeriod: TTimePeriod;
  isCreate: boolean;
  stepCreate: TStep;
  createState: ICraeteState;
  lastFetch: string;
}

export interface IChangeTimePeriodAction {
  timePeriod: TTimePeriod;
}

export interface ISaveKPIs {
  mainKPIs: mainKPI;
}

export interface ISaveDefindKPI {
  departmentID: number;
  kpis: IKPI;
}

export interface ICloseMainKPI {
  departmentID: number;
}

export interface IStepCreate {
  step: TStep;
}

export interface ICreateSate {
  departmentName: string;
}

export interface ISetLastFetch {
  time: string;
}

export interface ISetNumberOfKPIs {
  count: -1 | 1;
  departmentID: number;
}

export interface ISetOpenKPIs {
  openKPIs: number[];
}

export interface ISetDataNameKPIs {
  data: IDataGetName[];
}
export interface ISetLoadingMain {
  isLoading: boolean;
}

export interface ISetLoadingDef {
  isLoading: boolean;
  departmentID: number;
}
