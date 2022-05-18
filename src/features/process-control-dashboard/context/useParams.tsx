import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Item } from "../../../Component/DesignSystem/DropDown/types";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus } from "../../tasks-management/ts";
import { DepartmentMachineItem } from "../components/DashboardForm/MachineParamRow/MachineParamRow";
import { APIParams, Machine, Param } from "../ts";

type ParamsState = {
  paramOptions: ParamOption[];
  machineOptions: Item[];
  fetchParams: () => void;
  status: APIStatus;
  error: unknown | undefined;
  getParamNameById: (id: number) => string;
  getParamDisplayNameById: (id: number) => string;
  getParamIdByParamName: (name: string) => number;
};

type ParamOption = Item & { machineId: number };

type ParamsContextProviderProps = {
  children: React.ReactNode;
};

const ParamsContext = createContext<ParamsState | undefined>(undefined);

const ParamsContextProvider = ({ children }: ParamsContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [params, setParams] = useState<Param[] | undefined>(undefined);
  const [machines, setMachines] = useState<Machine[] | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  const fetchParams = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APIParams>(API_URLS.getSimpleProcessControlParams)
        .then((res) => res.data);
      const machines = values.ResponseDictionary.Machines;
      const params = values.ResponseDictionary.MachinesParams;
      setMachines(machines);
      setParams(params);
      setStatus("success");
      setError(undefined);
      if (values.error) {
        setError(values.error.ErrorMessage);
        setStatus("error");
      }
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, []);

  const machineOptions: Item[] = useMemo(
    () =>
      machines?.map((m) => ({
        value: m.MachineID,
        label: `${m.DepartmentName}: ${m.MachineName}`,
        childComponent: (
          <DepartmentMachineItem
            department={m.DepartmentName}
            machine={m.MachineName}
          />
        ),
      })) || [],
    [machines]
  );

  const paramOptions: ParamOption[] = useMemo(
    () =>
      params?.map((p) => ({
        machineId: p.MachineID,
        value: p.FieldID,
        label: p.FieldDisplayName,
      })) || [],
    [params]
  );

  const getParamNameById = useCallback(
    (paramId: number) =>
      params?.find((p) => p.FieldID === paramId)?.FieldName || "",
    [params]
  );

  const getParamDisplayNameById = useCallback(
    (paramId: number) =>
      params?.find((p) => p.FieldID === paramId)?.FieldDisplayName || "",
    [params]
  );

  const getParamIdByParamName = useCallback(
    (paramDisplayName: string) =>
      params?.find((p) => p.FieldName === paramDisplayName)?.FieldID || 0,
    [params]
  );

  return (
    <ParamsContext.Provider
      value={{
        paramOptions,
        fetchParams,
        status,
        error,
        machineOptions,
        getParamNameById,
        getParamDisplayNameById,
        getParamIdByParamName,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};

const useParams = () => {
  const context = useContext(ParamsContext);
  if (context === undefined) {
    throw new Error("useParams must be used within the ParamsContextProvider");
  }

  return context;
};

export { ParamsContextProvider, useParams };
