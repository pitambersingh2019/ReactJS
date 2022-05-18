import { createContext, useCallback, useContext, useState } from "react";
import { Item } from "../../../Component/DesignSystem/DropDown/types";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import {
  APIStatus,
  APISubSubject,
  APITaskObjects,
  Level,
  Subject,
} from "../ts";

type TaskObjectsState = {
  levelItems: Item[] | undefined;
  activeSubjectItems: Item[] | undefined;
  subSubjects: APISubSubject[] | undefined;
  fetchTaskObjects: () => void;
  status: APIStatus;
  error: unknown | undefined;
  errorAPI: string | undefined;
};

type TaskObjectsContextProviderProps = {
  children: React.ReactNode;
};

const TaskObjectsContext = createContext<TaskObjectsState | undefined>(
  undefined
);

const TaskObjectsContextProvider = ({
  children,
}: TaskObjectsContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [subjects, setSubjects] = useState<Subject[] | undefined>(undefined);
  const [levels, setLevels] = useState<Level[] | undefined>(undefined);
  const [subSubjects, setSubSubjects] = useState<APISubSubject[] | undefined>(
    undefined
  );
  const [error, setError] = useState<unknown>(undefined);
  const [errorAPI, setErrorAPI] = useState<string | undefined>(undefined);

  const fetchTaskObjects = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APITaskObjects>(API_URLS.getTaskObjects, {
          SourceTaskCreationPlatform: 1,
        })
        .then((res) => res.data);
      setSubjects(values.ResponseDictionaryDT.Subjects);
      setLevels(values.ResponseDictionaryDT.Level);
      setSubSubjects(values.ResponseDictionaryDT.SubSubjects);
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

  const activeSubjectItems: Item[] | undefined = subjects
    ?.filter((sub) => sub.IsActive)
    .map(({ ID, DisplayName }) => ({
      value: ID,
      label: DisplayName,
    }));

  const levelItems: Item[] | undefined = levels?.map(({ ID, DisplayName }) => ({
    value: ID,
    label: DisplayName,
  }));

  return (
    <TaskObjectsContext.Provider
      value={{
        activeSubjectItems,
        levelItems,
        subSubjects,
        fetchTaskObjects,
        status,
        error,
        errorAPI,
      }}
    >
      {children}
    </TaskObjectsContext.Provider>
  );
};

const useTaskObjects = () => {
  const context = useContext(TaskObjectsContext);
  if (context === undefined) {
    throw new Error(
      "useTaskObjects must be used within the TaskObjectsContextProvider"
    );
  }

  return context;
};

export { TaskObjectsContextProvider, useTaskObjects };
