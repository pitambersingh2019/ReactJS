import { Dispatch, SetStateAction } from "react";
import { IDepartmet, IFilterLabels, IResponseFilter } from "../../api/types";

export type TUnit = "percentage" | "decimal" | "";
export type TDisplay = "Gauge" | "Graph" | "Percent";
export type TGuageType = "single" | "3 ranges";
export type TDigists = 0 | 1 | 2;

export interface IMinMax {
  min: number;
  max: number;
}

export interface IFirstStepLast {
  KPIName: string;
  level: string;
  departmentID: number;
  displayOrder: number;
  filter: string;
  formulaID: number;
  filterData: IResponseFilter;
  departmets: IDepartmet[];
}

export interface IThirdStep {
  gaugeType: TGuageType;
  digists: TDigists;
  shift: IMinMax;
  day: IMinMax;
  week: IMinMax;
  month: IMinMax;
}

export type TComponent =
  | "FuncComponent"
  | "CalComponent"
  | "ParamComponent"
  | "PlusComponent";
export interface IFormulaComponent {
  component: TComponent;
  props: any;
}
export type TActiveType =
  | "Functions"
  | "Params"
  | "Numbers"
  | "+"
  | "-"
  | "*"
  | "/"
  | ".";
export interface IFirstStep {
  KPIName: string;
  status: "loading" | "error" | "ok";
  formulaID: number;
  isFirstTime: boolean;
  formulaComponent: IFormulaComponent[];
  formula: string;
  saveFormula: string;
  ActiveElement: number;
  ActiveType: TActiveType[];
}

export interface IFourthStep {
  isActive: boolean;
  isPrimary: boolean;
}
export interface ISecondStep {
  level: string;
  departmentID: number;
  displayType: TDisplay;
  filter: IFilterLabels;
  filterData: IResponseFilter;
  departmets: IDepartmet[];
}

export interface InitialValue {
  stepCheck: boolean[];
  firstStepSetting: IFirstStep;
  setFirstStepSetting: Dispatch<SetStateAction<IFirstStep>>;
  secondStepSetting: ISecondStep;
  setSecondStepSetting: Dispatch<SetStateAction<ISecondStep>>;
  thirdStepSetting: IThirdStep;
  setThirdStepSetting: Dispatch<SetStateAction<IThirdStep>>;
  fourthStepSetting: IFourthStep;
  setFourthStepSetting: Dispatch<SetStateAction<IFourthStep>>;
}
