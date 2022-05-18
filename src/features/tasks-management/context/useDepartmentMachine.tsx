import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIDepartmentMachine, APIStatus, MachineIdName } from "../ts";

type DepartmetMachineState = {
  departmentMachines: MachineIdName[] | undefined;
  fetchDepartmentMachine: () => void;
  status: APIStatus;
  error: unknown | undefined;
  errorAPI: string | undefined;
};

type DepartmentMachineContextProviderProps = {
  children: React.ReactNode;
};

const DepartmentMachineContext = createContext<
  DepartmetMachineState | undefined
>(undefined);

const DepartmentMachineContextProvider = ({
  children,
}: DepartmentMachineContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [departmentMachines, setDeparatmentMachines] = useState<
    MachineIdName[] | undefined
  >(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [errorAPI, setErrorAPI] = useState<string | undefined>(undefined);

  const fetchDepartmentMachine = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APIDepartmentMachine>(API_URLS.getDepartmentMachine, {
          SourceTaskCreationPlatform: 1,
        })
        .then((res) => res.data);
      //typo on the backend
      const machines = values.DepartemntMachineGroups.map(
        (group) => group.Value
      )
        .flat()
        .map((item) =>
          item.Value.map(({ Id, MachineName }) => ({ Id, MachineName }))
        )
        .flat();
      setDeparatmentMachines(machines);
      setStatus("success");
      setError(undefined);
      setErrorAPI(undefined);
      if (values.error) {
        setErrorAPI(values.error.ErrorMessage);
        setStatus("error");
      }
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, []);

  return (
    <DepartmentMachineContext.Provider
      value={{
        departmentMachines,
        fetchDepartmentMachine,
        status,
        error,
        errorAPI,
      }}
    >
      {children}
    </DepartmentMachineContext.Provider>
  );
};

const useDepartmentMachine = () => {
  const context = useContext(DepartmentMachineContext);
  if (context === undefined) {
    throw new Error(
      "useDepartmentMachine must be used within the DepartmentMachineContextProvider"
    );
  }

  return context;
};

export { DepartmentMachineContextProvider, useDepartmentMachine };
