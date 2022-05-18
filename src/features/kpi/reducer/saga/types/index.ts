import { IKPISave } from "../../../api/types";

interface actionTemplate {
  type: string;
}

export interface GetDefindKPIAction extends actionTemplate {
  payload: {
    departmentID: number;
    timePeriod: number;
  };
}

export interface ChangeKPIAction extends actionTemplate {
  payload: {
    FormulaID: number;
  };
}

export interface ISaveKPIAction extends actionTemplate {
  payload: {
    kpi: IKPISave;
  };
}

export interface ClickSwitchAction extends actionTemplate {
  payload: {
    kpi: IKPISave;
    departmentID: number;
    isPrimaryUpdate: boolean;
  };
}
