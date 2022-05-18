import { createContext, useContext } from "react";
import { TasksPermissionsLevel } from "../ts";
import { getCurrentUserId, getTasksPermissionsLevel } from "../utils";

type TasksPermissionsLevelState = {
  level3: boolean;
  level2: boolean;
  level1: boolean;
  currentUserId: number | undefined;
};

type TasksPermissionsLevelContextProviderProps = {
  children: React.ReactNode;
};

const TasksPermissionsLevelContext = createContext<
  TasksPermissionsLevelState | undefined
>(undefined);

const TasksPermissionsLevelContextProvider = ({
  children,
}: TasksPermissionsLevelContextProviderProps) => {
  const tasksPermissionsLevel = getTasksPermissionsLevel();
  const currentUserId = getCurrentUserId();

  const level3 = Number(tasksPermissionsLevel) === TasksPermissionsLevel.Level3;
  const level2 = Number(tasksPermissionsLevel) === TasksPermissionsLevel.Level2;
  const level1 = Number(tasksPermissionsLevel) === TasksPermissionsLevel.Level1;

  return (
    <TasksPermissionsLevelContext.Provider
      value={{ level3, level2, level1, currentUserId }}
    >
      {children}
    </TasksPermissionsLevelContext.Provider>
  );
};

const useTasksPermissionsLevel = () => {
  const context = useContext(TasksPermissionsLevelContext);
  if (context === undefined) {
    throw new Error(
      "useTasksPermissionsLevel must be used within the TasksPermissionsLevelContextProvider"
    );
  }

  return context;
};

export { TasksPermissionsLevelContextProvider, useTasksPermissionsLevel };
