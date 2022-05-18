import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Status,
  Task,
  TaskLevel,
  TaskLevelExcludeFactory,
  TaskPriority,
} from "../ts";
import { areAllChecked, arrayCompare, deepEqual, filterTasks } from "../utils";
import useFiltersInitialState, {
  InitialFilterState,
} from "./useFiltersInitialState";
import { useTasks } from "./useTasks";

type ActiveFilters = {
  overdueFilterIsActive?: boolean;
  statusFilterIsActive?: boolean;
  priorityFilterIsActive?: boolean;
  subjectsFilterIsActive?: boolean;
  assigneeFilterIsActive?: boolean;
  machinesFilterIsActive?: boolean;
  departmentsFilterIsActive?: boolean;
  userGroupFilterIsActive?: boolean;
};

type FilterState = InitialFilterState & {
  setShowOverdueTasks: (show: boolean) => void;
  setStatuses: (statuses: Record<Status, boolean> | undefined) => void;
  setPriorityLevels: (
    levels: Record<TaskPriority, boolean> | undefined
  ) => void;
  setSubjects: (values: { [key: number]: boolean } | undefined) => void;
  setAssigneeDisplayName: (
    assignees: { [displayName: string]: boolean } | undefined
  ) => void;
  setLevelObjects: (
    objects:
      | Record<TaskLevelExcludeFactory, { [key: number]: boolean }>
      | undefined
  ) => void;
  setDoneInXDays: (value: string | undefined) => void;
  filtersUpdated: boolean | undefined;
  filteredTasks: Task[] | undefined;
  setFilteredTasks: (tasks: Task[]) => void;
  resetFilters: () => void;
  onFilterTasks: (filters?: Partial<InitialFilterState>) => void;
  makeActiveFilters: () => void;
  filtersApplied: boolean;
  setFiltersApplied: (value: boolean) => void;
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
  currentFilters: InitialFilterState;
};

type FilterContextProviderProps = {
  children: React.ReactNode;
};

const FilterContext = createContext<FilterState | undefined>(undefined);

const FilterContextProvider = ({ children }: FilterContextProviderProps) => {
  const { tasks } = useTasks();
  const { initialState } = useFiltersInitialState();

  const [showOverdueTasks, setShowOverdueTasks] =
    useState<InitialFilterState["showOverdueTasks"]>(undefined);
  const [statuses, setStatuses] =
    useState<InitialFilterState["statuses"]>(undefined);
  const [priorityLevels, setPriorityLevels] =
    useState<InitialFilterState["priorityLevels"]>(undefined);
  const [subjects, setSubjects] =
    useState<InitialFilterState["subjects"]>(undefined);
  const [assigneeDisplayName, setAssigneeDisplayName] =
    useState<InitialFilterState["assigneeDisplayName"]>(undefined);
  const [levelObjects, setLevelObjects] =
    useState<InitialFilterState["levelObjects"]>(undefined);
  const [doneInXDays, setDoneInXDays] =
    useState<InitialFilterState["doneInXDays"]>(undefined);

  const [filteredTasks, setFilteredTasks] = useState<Task[] | undefined>(
    undefined
  );

  const [filtersApplied, setFiltersApplied] = useState(false);

  const activeFiltersInitialState = {
    overdueFilterIsActive: false,
    statusFilterIsActive: false,
    priorityFilterIsActive: false,
    subjectsFilterIsActive: false,
    assigneeFilterIsActive: false,
    machinesFilterIsActive: false,
    departmentsFilterIsActive: false,
    userGroupFilterIsActive: false,
  };

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    activeFiltersInitialState
  );

  const setDefaultState = useCallback(() => {
    if (initialState) {
      const {
        showOverdueTasks,
        statuses,
        priorityLevels,
        subjects,
        assigneeDisplayName,
        doneInXDays,
        levelObjects,
      } = initialState;
      setShowOverdueTasks(showOverdueTasks);
      setStatuses(statuses);
      setPriorityLevels(priorityLevels);
      setSubjects(subjects);
      setAssigneeDisplayName(assigneeDisplayName);
      setLevelObjects(levelObjects);
      setDoneInXDays(doneInXDays);
    }
  }, [initialState]);

  useEffect(() => {
    setDefaultState();
  }, [setDefaultState]);

  const currentFilters = {
    showOverdueTasks,
    statuses,
    priorityLevels,
    subjects,
    assigneeDisplayName,
    levelObjects,
    doneInXDays,
  };

  const isDaysValid = Number(doneInXDays) > 0;

  const filtersUpdated =
    initialState &&
    !deepEqual<InitialFilterState>(initialState, currentFilters) &&
    isDaysValid;

  const resetFilters = () => {
    setDefaultState();
    setFiltersApplied(false);
    setActiveFilters(activeFiltersInitialState);

    if (tasks) {
      const resetedTasks = filterTasks({
        tasks,
        filters: {
          showOverdueTasks: initialState?.showOverdueTasks,
          statuses: initialState?.statuses,
          priorityLevels: initialState?.priorityLevels,
          subjects: initialState?.subjects,
          assignees: initialState?.assigneeDisplayName,
          machines:
            initialState?.levelObjects &&
            initialState?.levelObjects[TaskLevel.Machine],
          departments:
            initialState?.levelObjects &&
            initialState?.levelObjects[TaskLevel.Department],
          userGroups:
            initialState?.levelObjects &&
            initialState?.levelObjects[TaskLevel.UserGroup],
        },
      });

      setFilteredTasks(resetedTasks);
    }
  };

  const makeActiveFilters = () => {
    setActiveFilters({
      ...activeFilters,
      overdueFilterIsActive: showOverdueTasks,
      statusFilterIsActive: statuses && !areAllChecked(Object.values(statuses)),
      priorityFilterIsActive:
        priorityLevels && !areAllChecked(Object.values(priorityLevels)),
      subjectsFilterIsActive:
        subjects && !areAllChecked(Object.values(subjects)),
      assigneeFilterIsActive:
        assigneeDisplayName &&
        !areAllChecked(Object.values(assigneeDisplayName)),
      machinesFilterIsActive:
        levelObjects &&
        !areAllChecked(Object.values(levelObjects[TaskLevel.Machine])),
      departmentsFilterIsActive:
        levelObjects &&
        !areAllChecked(Object.values(levelObjects[TaskLevel.Department])),
      userGroupFilterIsActive:
        levelObjects &&
        !areAllChecked(Object.values(levelObjects[TaskLevel.UserGroup])),
    });
  };

  const onFilterTasks = useCallback(
    (filters?: Partial<InitialFilterState>) => {
      if (tasks) {
        const filtersToApply = {
          showOverdueTasks:
            filters?.showOverdueTasks !== undefined
              ? filters.showOverdueTasks
              : showOverdueTasks,
          statuses: filters?.statuses || statuses,
          priorityLevels: filters?.priorityLevels || priorityLevels,
          subjects: filters?.subjects || subjects,
          assignees: filters?.assigneeDisplayName || assigneeDisplayName,
          machines:
            (filters?.levelObjects &&
              filters.levelObjects[TaskLevel.Machine]) ||
            (levelObjects && levelObjects[TaskLevel.Machine]),
          departments:
            (filters?.levelObjects &&
              filters.levelObjects[TaskLevel.Department]) ||
            (levelObjects && levelObjects[TaskLevel.Department]),
          userGroups:
            (filters?.levelObjects &&
              filters.levelObjects[TaskLevel.UserGroup]) ||
            (levelObjects && levelObjects[TaskLevel.UserGroup]),
        };
        const updatedFilteredTasks = filterTasks({
          tasks,
          filters: filtersToApply,
        });
        setFilteredTasks(updatedFilteredTasks);
        setFiltersApplied(true);
      }
    },
    [
      assigneeDisplayName,
      levelObjects,
      priorityLevels,
      showOverdueTasks,
      statuses,
      subjects,
      tasks,
    ]
  );

  //filter tasks when tasks are updated (refetched)
  useEffect(() => {
    if (tasks && prevTasks.current) {
      const isEqual = arrayCompare<Task>(tasks, prevTasks.current);
      if (!isEqual) {
        onFilterTasks();
      }
    }
  });

  const prevTasks = useRef<Task[] | undefined | null>(null);
  useEffect(() => {
    prevTasks.current = tasks;
  });

  return (
    <FilterContext.Provider
      value={{
        showOverdueTasks,
        setShowOverdueTasks,
        statuses,
        setStatuses,
        priorityLevels,
        setPriorityLevels,
        subjects,
        setSubjects,
        assigneeDisplayName,
        setAssigneeDisplayName,
        levelObjects,
        setLevelObjects,
        doneInXDays,
        setDoneInXDays,
        filtersUpdated,
        filteredTasks,
        setFilteredTasks,
        resetFilters,
        onFilterTasks,
        makeActiveFilters,
        filtersApplied,
        setFiltersApplied,
        activeFilters,
        setActiveFilters,
        currentFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within the FilterContextProvider");
  }

  return context;
};

export { FilterContextProvider, useFilter };
