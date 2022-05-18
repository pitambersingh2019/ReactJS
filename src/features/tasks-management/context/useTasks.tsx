import React, { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus, APITasks, Status, Task } from "../ts";
import { useTasksPermissionsLevel } from "./useTasksPermissionsLevel";

type TasksState = {
  tasks: Task[] | undefined;
  setTasks: (tasks: Task[]) => void;
  fetchTasks: (hours?: number, onSuccess?: () => void) => void;
  status: APIStatus;
  error: unknown | undefined;
  errorAPI: string | undefined;
};

type TasksContextProviderProps = {
  children: React.ReactNode;
};

const TasksContext = createContext<TasksState | undefined>(undefined);

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [errorAPI, setErrorAPI] = useState<string | undefined>(undefined);

  const { currentUserId, level2, level3, level1 } = useTasksPermissionsLevel();

  const filterTasksPermissions = useCallback(
    (allTasks: Task[]) => {
      if (level3) {
        return allTasks.filter(
          (ts) =>
            ts.Assignee === currentUserId || ts.TaskStatus === Status.Unassigned
        );
      }
      if (level2) {
        return allTasks.filter(
          (ts) =>
            ts.Assignee === currentUserId ||
            ts.TaskStatus === Status.Unassigned ||
            ts.TaskCreateUser === currentUserId
        );
      }
      if (level1) {
        return allTasks;
      }
      return undefined;
    },
    [currentUserId, level1, level2, level3]
  );

  const fetchTasks = useCallback(
    async (hoursToDisplay = 24, onSuccess?: () => void) => {
      try {
        setStatus("loading");
        const values = await api
          .post<APITasks>(API_URLS.getTasks, {
            SourceTaskCreationPlatform: 1,
            hoursToDisplay,
          })
          .then((res) => res.data);
        const allTasks = values.ResponseDictionaryValues.TaskProgress;
        const permissionsFiltered = filterTasksPermissions(allTasks);
        setTasks(permissionsFiltered);
        setStatus("success");
        setError(undefined);
        setErrorAPI(undefined);
        if (values.error) {
          setErrorAPI(values.error.ErrorMessage);
          setStatus("error");
        }
        if (onSuccess && !values.error) {
          onSuccess();
        }
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    },
    [filterTasksPermissions]
  );

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, fetchTasks, status, error, errorAPI }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error(
      "useTasksContext must be used within the TasksContextProvider"
    );
  }

  return context;
};

export { TasksContextProvider, useTasks };
