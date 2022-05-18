import { loadStateLang } from "../../../AppStart";
import { Item } from "../../../Component/DesignSystem/DropDown/types";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { TaskLevelObjects } from "../context/useTaskLevelObjects";
import {
  ActiveFilters,
  APIFilter,
  Checked,
  Filter,
  MachineIdName,
  Status,
  Task,
  TaskLevel,
  TaskPriority,
} from "../ts";
import { isStartOverdue } from "./date-time-helpers";

export const getObjectOptions = ({
  level,
  objects,
  departmentMachines,
}: {
  level: number;
  objects: TaskLevelObjects | undefined;
  departmentMachines: MachineIdName[] | undefined;
}): Item[] | undefined => {
  if (level === TaskLevel.Factory) {
    return undefined;
  }

  if (level === TaskLevel.Department) {
    return objects?.Departments.map(({ ID, LName }) => ({
      value: ID,
      label: LName,
    }));
  }
  if (level === TaskLevel.Machine) {
    return objects?.Machines.map(({ ID, MachineLName }) => ({
      value: ID,
      label: MachineLName,
    }));
  }
  if (level === TaskLevel.Job) {
    return objects?.Jobs.filter(({ ERPJobID }) => ERPJobID)
      .map((job) => {
        const machineName = departmentMachines?.find(
          (machine) => machine.Id === job.MachineID
        )?.MachineName;
        return {
          ...job,
          machineName,
        };
      })
      .sort((a, b) =>
        a.machineName || b.machineName
          ? !a.machineName
            ? 1
            : !b.machineName
            ? -1
            : a.machineName?.localeCompare(b.machineName)
          : 0
      )
      .map(({ ID, ERPJobID }) => ({
        value: ID,
        label: ERPJobID,
      }));
  }
  if (level === TaskLevel.UserGroup) {
    const lang = JSON.parse(loadStateLang());
    return objects?.UserDefinitions.map(({ ID, EName, HName }) => ({
      value: ID,
      label: lang === "eng" ? EName : HName,
    }));
  }
  if (level === TaskLevel.Mold) {
    return objects?.Molds.flatMap(({ ID, LName }) =>
      LName
        ? {
            value: ID,
            label: LName,
          }
        : []
    );
  }
  if (level === TaskLevel.Auxiliary) {
    return objects?.Auxiliaries.flatMap(({ ID, Name }) =>
      Name ? { value: ID, label: Name } : []
    );
  }
};

export const topOptionChecked = (valuesArray: boolean[] | undefined) => {
  if (valuesArray) {
    if (valuesArray.every(Boolean)) {
      return Checked.All;
    }
    if (valuesArray.some(Boolean)) {
      return Checked.Half;
    }
  }
  return Checked.None;
};

export const areAllChecked = (valuesArray: boolean[]) =>
  valuesArray.every(Boolean);

export const filterTasks = ({
  tasks,
  filters,
}: {
  tasks: Task[];
  filters: ActiveFilters;
}) => {
  return tasks.filter((task) => {
    const {
      showOverdueTasks,
      statuses,
      priorityLevels,
      subjects,
      assignees,
      machines,
      departments,
      userGroups,
    } = filters;
    const cond1 = showOverdueTasks
      ? task.EndTimeException === 1 || isStartOverdue(task)
      : true;
    const cond2 = priorityLevels ? priorityLevels[task.TaskPriorityID] : true;
    const cond3 =
      (subjects && subjects[task.SubjectID]) || task.SubjectID === null;
    const cond4 = assignees && assignees[task.AssigneeDisplayName];
    const cond5 =
      task.TaskLevel === TaskLevel.Machine
        ? machines && machines[task.ObjectID]
        : true;
    const cond6 =
      task.TaskLevel === TaskLevel.Department
        ? departments && departments[task.ObjectID]
        : true;
    const cond7 =
      task.TaskLevel === TaskLevel.UserGroup
        ? userGroups && userGroups[task.ObjectID]
        : true;
    const cond8 = statuses ? statuses[task.TaskStatus] : true;
    return cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8;
  });
};

export const countActiveValues = (filterObject: { [key: number]: boolean }) => {
  return Object.values(filterObject).reduce(
    (count, value) => (value ? count + 1 : count),
    0
  );
};

export const getCheckedOptionsNames = (options: OptionItem[]) =>
  options.flatMap((option) => (option.isChecked ? option.name : []));

export const toggleAllPriorityLevelFilter = ({
  priorityLevels,
  checked,
}: {
  priorityLevels: Record<TaskPriority, boolean>;
  checked: boolean;
}) =>
  Object.keys(priorityLevels)
    .filter((key) => !isNaN(Number(key)))
    .reduce((result, item) => {
      const priority: string = TaskPriority[Number(item)];
      const level: TaskPriority =
        TaskPriority[priority as keyof typeof TaskPriority];
      result[level] = checked;
      return result;
    }, {} as Record<TaskPriority, boolean>);

export const toggleAllStatusFilter = ({
  statuses,
  checked,
}: {
  statuses: Record<Status, boolean>;
  checked: boolean;
}) =>
  Object.keys(statuses)
    .filter((key) => !isNaN(Number(key)))
    .reduce((result, item) => {
      const statusName: string = Status[Number(item)];
      const status: Status = Status[statusName as keyof typeof Status];
      result[status] = checked;
      return result;
    }, {} as Record<Status, boolean>);

export const toggleAllFilterOptions = ({
  options,
  checked,
}: {
  options: { [key: number | string]: boolean };
  checked: boolean;
}) =>
  Object.keys(options).reduce((result, item) => {
    result[item] = checked;
    return result;
  }, {} as { [key: number | string]: boolean });

export const parseSavedFilters = (savedFiltersAPI: APIFilter[]): Filter[] =>
  savedFiltersAPI.map(parseSavedFilter);

const parseSavedFilter = ({
  FilterTemplate,
  ...otherProps
}: APIFilter): Filter => {
  const parsedTemplate: Omit<Filter, "FilterName" | "FilterId"> =
    JSON.parse(FilterTemplate);
  return {
    Subjects: parsedTemplate.Subjects,
    OnlyLate: parsedTemplate.OnlyLate,
    Status: parsedTemplate.Status,
    Priority: parsedTemplate.Priority,
    AssigneeDisplayName: parsedTemplate.AssigneeDisplayName,
    TaskObject: parsedTemplate.TaskObject,
    doneCancelLastXDays: parsedTemplate.doneCancelLastXDays,
    ...otherProps,
  };
};

export const getSessionID = () => {
  try {
    const user = window.sessionStorage.getItem("ngStorage-userAuthenticated");
    if (!user) {
      return undefined;
    }
    return JSON.parse(user).accessToken;
  } catch (err) {
    return undefined;
  }
};

export const getCurrentUserId = () => {
  try {
    const userId = window.sessionStorage.getItem("ngStorage-userID");
    if (!userId) {
      return undefined;
    }
    return Number(userId);
  } catch (err) {
    return undefined;
  }
};

export const getTasksPermissionsLevel = () => {
  try {
    const tasksPermissionsLevel = window.sessionStorage.getItem(
      "ngStorage-tasksPermissionLevel"
    );
    if (!tasksPermissionsLevel) {
      return undefined;
    }
    return tasksPermissionsLevel;
  } catch (err) {
    return undefined;
  }
};

export const getFileNameAndExt = (fullFileName: string) => {
  const fileExt =
    fullFileName.substring(
      fullFileName.lastIndexOf(".") + 1,
      fullFileName.length
    ) || fullFileName;
  const fileName =
    fullFileName.substring(0, fullFileName.lastIndexOf(".")) || fullFileName;
  return { fileName, fileExt };
};

export function deepEqual<T>(object1: T, object2: T) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key as keyof T];
    const val2 = object2[key as keyof T];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object: unknown) {
  return object != null && typeof object === "object";
}

export const getAllowedStatus = (currentStatus: Status) => {
  if (currentStatus === Status.Unassigned) {
    return [Status.Unassigned, Status["To Do"], Status.Canceled];
  }
  if (currentStatus === Status["To Do"]) {
    return [
      Status.Unassigned,
      Status["To Do"],
      Status["In Progress"],
      Status.Canceled,
    ];
  }
  if (currentStatus === Status["In Progress"]) {
    return [
      Status["To Do"],
      Status["In Progress"],
      Status.Done,
      Status.Canceled,
    ];
  }
  if (currentStatus === Status.Done) {
    return [Status["To Do"], Status.Done];
  }
  if (currentStatus === Status.Canceled) {
    return [Status["To Do"], Status.Canceled];
  }

  return [];
};

export function arrayCompare<T>(
  arr1: Array<T> | undefined,
  arr2: Array<T> | undefined
) {
  if (arr1 && arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => deepEqual(value, arr2[index]))
    );
  }
  if (!arr1 && !arr1) {
    return true;
  }
  if (!arr1 || !arr2) {
    return false;
  }
}
