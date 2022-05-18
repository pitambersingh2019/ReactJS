import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import {
  APIStatus,
  APITaskLevelObjects,
  Auxiliary,
  Department,
  Job,
  Machine,
  Mold,
  UserDefinition,
} from "../ts";

export type TaskLevelObjects = {
  Departments: Department[];
  Machines: Machine[];
  Jobs: Job[];
  UserDefinitions: UserDefinition[];
  Molds: Mold[];
  Auxiliaries: Auxiliary[];
};

type TaskLevelObjectsState = {
  objects: TaskLevelObjects | undefined;
  fetchTaskLevelObjects: () => void;
  status: APIStatus;
  error: unknown | undefined;
  errorAPI: string | undefined;
};

type TaskLevelObjectsContextProviderProps = {
  children: React.ReactNode;
};

const TaskLevelObjectsContext = createContext<
  TaskLevelObjectsState | undefined
>(undefined);

const TaskLevelObjectsContextProvider = ({
  children,
}: TaskLevelObjectsContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [objects, setObjects] = useState<TaskLevelObjects | undefined>(
    undefined
  );
  const [error, setError] = useState<unknown>(undefined);
  const [errorAPI, setErrorAPI] = useState<string | undefined>(undefined);

  const fetchTaskLevelObjects = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APITaskLevelObjects>(API_URLS.getTaskLevelObjects, {
          SourceTaskCreationPlatform: 1,
        })
        .then((res) => res.data);
      setObjects(values.ResponseDictionaryDT);
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
    <TaskLevelObjectsContext.Provider
      value={{
        objects,
        fetchTaskLevelObjects,
        status,
        error,
        errorAPI,
      }}
    >
      {children}
    </TaskLevelObjectsContext.Provider>
  );
};

const useTaskLevelObjects = () => {
  const context = useContext(TaskLevelObjectsContext);
  if (context === undefined) {
    throw new Error(
      "useTaskLevelObjects must be used within the TaskLevelObjectsContextProvider"
    );
  }

  return context;
};

export { TaskLevelObjectsContextProvider, useTaskLevelObjects };
