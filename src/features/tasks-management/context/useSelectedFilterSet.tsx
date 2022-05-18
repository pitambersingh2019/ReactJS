import { createContext, useContext, useEffect, useState } from "react";
import { Item } from "../../../Component/DesignSystem/DropDown/types";
import { useFilter } from "./useFilter";
import useFiltersInitialState, {
  InitialFilterState,
} from "./useFiltersInitialState";
import { useSavedFilters } from "./useSavedFilters";

type SelectedFilterSetState = {
  selectedFilterSet: Item | undefined;
  setSelectedFilterSet: (set: Item | undefined) => void;
  selectedActiveFilter: InitialFilterState | undefined;
};

type SelectedFilterSetContextProviderProps = {
  children: React.ReactNode;
};

const SelectedFilterSetContext = createContext<
  SelectedFilterSetState | undefined
>(undefined);

const SelectedFilterSetContextProvider = ({
  children,
}: SelectedFilterSetContextProviderProps) => {
  const [selectedFilterSet, setSelectedFilterSet] = useState<Item | undefined>(
    undefined
  );
  const [selectedActiveFilter, setSelectedActiveFilter] = useState<
    InitialFilterState | undefined
  >(undefined);

  const { initialState } = useFiltersInitialState();
  const { savedFilters } = useSavedFilters();
  const {
    setShowOverdueTasks,
    setStatuses,
    setPriorityLevels,
    setSubjects,
    setAssigneeDisplayName,
    setLevelObjects,
    setDoneInXDays,
  } = useFilter();

  useEffect(() => {
    if (selectedFilterSet) {
      const activeFilter = savedFilters?.find(
        (filter) => filter.FilterID === selectedFilterSet.value
      );
      //applyfilters
      if (activeFilter) {
        const {
          OnlyLate,
          Status,
          Priority,
          Subjects,
          TaskObject,
          AssigneeDisplayName,
          doneCancelLastXDays,
        } = activeFilter;
        setSelectedActiveFilter({
          showOverdueTasks: OnlyLate,
          statuses: Status || initialState?.statuses,
          priorityLevels: Priority,
          subjects: Subjects,
          assigneeDisplayName: AssigneeDisplayName,
          doneInXDays: doneCancelLastXDays.toString(),
          levelObjects: TaskObject,
        });

        setShowOverdueTasks(OnlyLate);
        setStatuses(Status || initialState?.statuses);
        setPriorityLevels(Priority);
        setSubjects(Subjects);
        setLevelObjects(TaskObject);
        setAssigneeDisplayName(AssigneeDisplayName);
        setDoneInXDays(doneCancelLastXDays.toString());
      }
    }
  }, [
    savedFilters,
    setStatuses,
    selectedFilterSet,
    setAssigneeDisplayName,
    setLevelObjects,
    setPriorityLevels,
    setShowOverdueTasks,
    setSubjects,
    setDoneInXDays,
    initialState?.statuses,
  ]);

  return (
    <SelectedFilterSetContext.Provider
      value={{ selectedFilterSet, setSelectedFilterSet, selectedActiveFilter }}
    >
      {children}
    </SelectedFilterSetContext.Provider>
  );
};

const useSelectedFilterSet = () => {
  const context = useContext(SelectedFilterSetContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedFilterSet must be used within the SelectedFilterSetContextProvider"
    );
  }

  return context;
};

export { SelectedFilterSetContextProvider, useSelectedFilterSet };
