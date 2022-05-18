import { IFilterLabels } from "../../api/types";
import { IFirstStep, IFourthStep, ISecondStep, IThirdStep } from "../types";

export const initialFirstStep: IFirstStep = {
  KPIName: "New KPI",
  status: "ok",
  isFirstTime: true,
  formulaID: 0,
  formula: "",
  saveFormula: "",
  formulaComponent: [
    {
      component: "PlusComponent",
      props: {
        isActive: false,
        keyDate: new Date().getMilliseconds(),
        isLast: true,
      },
    },
  ],
  ActiveElement: 0,
  ActiveType: ["Functions", "Numbers", "-"],
};

export const initialFilter: IFilterLabels = {
  MachineIdFilter: [],
  ShiftNameFilter: [],
  ERPJobDefFilter: [],
  ProductGroupFilter: [],
  ProductIdFilter: [],
  MoldGroupFilter: [],
  MoldIdFilter: [],
  UserIdFilter: [],
  ClientIdFilter: [],
  IsEndOfLineFilter: [],
};

export const initialSecondStep: ISecondStep = {
  displayType: "Gauge",
  level: "",
  departmentID: -1,
  filterData: {
    Filters: [],
    Machines: [],
    ShiftDef: [],
    ERPJobDef: [],
    isChange: false,
  },
  filter: initialFilter,
  departmets: [],
};

export const initialThirdStep: IThirdStep = {
  gaugeType: "single",
  digists: 0,
  shift: {
    min: 0,
    max: 0,
  },
  day: {
    min: 0,
    max: 0,
  },
  week: {
    min: 0,
    max: 0,
  },
  month: {
    min: 0,
    max: 0,
  },
};

export const initialFourthStep: IFourthStep = {
  isActive: true,
  isPrimary: false,
};
