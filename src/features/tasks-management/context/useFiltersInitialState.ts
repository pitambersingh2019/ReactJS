import { useEffect, useState } from "react";
import {
  Department,
  Job,
  Machine,
  Status,
  TaskLevel,
  TaskLevelExcludeFactory,
  TaskPriority,
  UserDefinition,
} from "../ts";
import { useTaskLevelObjects } from "./useTaskLevelObjects";
import { useTaskObjects } from "./useTaskObjects";
import { useUsersForTask } from "./useUsersForTask";

export type InitialFilterState = {
  showOverdueTasks: boolean | undefined;
  statuses: Record<Status, boolean> | undefined;
  priorityLevels: Record<TaskPriority, boolean> | undefined;
  subjects: { [key: number]: boolean } | undefined;
  assigneeDisplayName: { [displayName: string]: boolean } | undefined;
  levelObjects:
    | Record<TaskLevelExcludeFactory, { [key: number]: boolean }>
    | undefined;
  doneInXDays: string | undefined;
};

export default function useFiltersInitialState() {
  const [initialState, setInitialState] = useState<
    InitialFilterState | undefined
  >({} as InitialFilterState);

  const { activeSubjectItems } = useTaskObjects();
  const { users } = useUsersForTask();
  const { objects } = useTaskLevelObjects();

  useEffect(() => {
    const initSubj = activeSubjectItems?.reduce((result, item) => {
      result[item.value] = true;
      return result;
    }, {} as { [key: number]: boolean });

    const initAssignees = users?.reduce((result, item) => {
      result[item.DisplayName] = true;
      return result;
    }, {} as { [displayName: string]: boolean });

    let initObjects: Record<TaskLevel, { [key: number]: boolean }>;

    if (objects) {
      const mapLevels: Record<number, keyof typeof objects> = {
        2: "Departments",
        3: "Machines",
        4: "Jobs",
        5: "UserDefinitions",
      };

      const keys = Object.keys(TaskLevel).filter((key) => !isNaN(Number(key)));
      initObjects = keys
        .filter((k) => Number(k) !== TaskLevel.Factory)
        .reduce((result, key) => {
          const taskLevel: TaskLevel = TaskLevel[key as keyof typeof TaskLevel];
          const level = TaskLevel[taskLevel] as unknown as TaskLevel;

          if (level !== TaskLevel.Mold && level !== TaskLevel.Auxiliary) {
            const levelValues = objects[mapLevels[Number(level)]] as
              | Department[]
              | Machine[]
              | Job[]
              | UserDefinition[];

            const _values: Array<Department | Machine | Job | UserDefinition> =
              levelValues;
            result[level] = _values.reduce((obj, { ID }) => {
              obj[ID] = true;
              return obj;
            }, {} as { [key: number]: boolean });
          }
          return result;
        }, {} as Record<TaskLevel, { [key: number]: boolean }>);
    }

    setInitialState((state) => ({
      ...state,
      showOverdueTasks: false,
      statuses: { 1: true, 2: true, 3: true, 4: true, 5: true },
      priorityLevels: { 1: true, 2: true, 3: true },
      subjects: initSubj,
      assigneeDisplayName: initAssignees,
      levelObjects: initObjects,
      doneInXDays: "1",
    }));
  }, [activeSubjectItems, objects, users]);

  return { initialState };
}
