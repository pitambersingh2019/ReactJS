import { api } from "../../api/api";
import {
  IDataChangeKPI,
  IDataDefinedKPIs,
  IDataGetDepartments,
  IDataGetInsightFilters,
  IDataGetResultSearchFields,
  IDataMainKPI,
  IDataParamsColumn,
  IDataTimePeriods,
  IGetCustomKPINames,
  IGetCustomKPIsFilterLabels,
  IKPISave,
  TSetDiaplayOrder,
} from "./types";

const headers = { "Content-Type": "application/json" };

export const KPIApi = {
  getPredefinedTimePeriods: async () => {
    return await api.post<IDataTimePeriods>(
      "GetPredefinedTimePeriods",
      {},
      { headers }
    );
  },
  getCustomerDefinedMainKPIs: async (timePeriod: number) => {
    return await api.post<IDataMainKPI>(
      "GetCustomerDefinedMainKPIs",
      { timePeriod },
      { headers }
    );
  },
  getCustomerDefinedKPIsResult: async (
    timePeriod: number,
    departmentID: number
  ) => {
    return await api.post<IDataDefinedKPIs>(
      "GetCustomerDefinedKPIsResult",
      { departmentID, timePeriod },
      { headers }
    );
  },
  deleteCustomerDefinedKPI: async (ID: number) => {
    return await api.post<IDataChangeKPI>(
      "DeleteCustomerDefinedKPI",
      { ID },
      { headers }
    );
  },
  duplicateCustomerDefinedKPI: async (ID: number) => {
    return await api.post<IDataChangeKPI>(
      "DuplicateCustomerDefinedKPI",
      { ID },
      { headers }
    );
  },
  setMainKPIFormula: async (ID: number) => {
    return await api.post<IDataChangeKPI>(
      "SetMainKPIFormula",
      { ID },
      { headers }
    );
  },
  getDepartments: async () => {
    return await api.post<IDataGetDepartments>(
      "GetDepartments",
      { IncludeFactory: true },
      { headers }
    );
  },
  getInsightFilters: async (DepartmentID: number) => {
    return await api.post<IDataGetInsightFilters>(
      "GetInsightFilters",
      { DepartmentID, OnlyCustomKPIsFilters: true },
      { headers }
    );
  },
  getResultSearchFields: async (reportID: number) => {
    return await api.post<IDataGetResultSearchFields>(
      "GetResultSearchFields",
      {
        reportID,
        sfCriteria: [],
      },
      { headers }
    );
  },
  saveCustomerDefinedKPI: async (KPI: IKPISave) => {
    return await api.post<IDataChangeKPI>(
      "SaveCustomerDefinedKPI",
      { KPI },
      { headers }
    );
  },
  getCustomKPIsColumns: async () => {
    return await api.post<IDataParamsColumn>(
      "GetCustomKPIsColumns",
      {},
      { headers }
    );
  },
  setCustomerDefinedKPIsDisplayOrder: async (
    DisplayOrders: TSetDiaplayOrder
  ) => {
    return await api.post<IDataParamsColumn>(
      "SetCustomerDefinedKPIsDisplayOrder",
      { DisplayOrders },
      { headers }
    );
  },
  getCustomKPIsFilterLabels: async (Value: string) => {
    return await api.post<IGetCustomKPIsFilterLabels>(
      "GetCustomKPIsFilterLabels",
      { Value },
      { headers }
    );
  },
  getCustomKPINames: async () => {
    return await api.post<IGetCustomKPINames>(
      "GetCustomKPINames",
      {},
      { headers }
    );
  },
};
