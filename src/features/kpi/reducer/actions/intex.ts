import { IKPISave } from "../../api/types";
import {
  ChangeKPIAction,
  ClickSwitchAction,
  GetDefindKPIAction,
  ISaveKPIAction,
} from "../saga/types";

export const OpenMainKPIAC = (
  departmentID: number,
  timePeriod: number
): GetDefindKPIAction => {
  return {
    type: "OPEN_MAIN_KPI",
    payload: {
      departmentID,
      timePeriod,
    },
  };
};

export const DeleteKPIAC = (FormulaID: number): ChangeKPIAction => {
  return {
    type: "DELETE_KPI",
    payload: {
      FormulaID,
    },
  };
};

export const DuplicateKPIAC = (FormulaID: number): ChangeKPIAction => {
  return {
    type: "DUPLICATE_KPI",
    payload: {
      FormulaID,
    },
  };
};

export const MakePrimaryKPIAC = (FormulaID: number): ChangeKPIAction => {
  return {
    type: "MAKE_PRIMARY_KPI",
    payload: {
      FormulaID,
    },
  };
};

export const saveKPIAC = (kpi: IKPISave): ISaveKPIAction => {
  return {
    type: "SAVE_KPI",
    payload: {
      kpi,
    },
  };
};

export const refreshMainKPIs = () => {
  return {
    type: "REFRESH_MAIN_KPIS",
    payload: {},
  };
};

export const clickSwitchKPIAC = (
  kpi: IKPISave,
  departmentID: number,
  isPrimaryUpdate: boolean
): ClickSwitchAction => {
  return {
    type: "CLICK_SWITCH_KPI",
    payload: { kpi, departmentID, isPrimaryUpdate },
  };
};

export const setKPINameAC = () => {
  return {
    type: "SET_KPI_NAME",
    payload: {},
  };
};
