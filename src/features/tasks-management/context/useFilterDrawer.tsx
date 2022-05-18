import { createContext, useContext, useState } from "react";

type FilterDrawerState = {
  statusOpened: boolean;
  setStatusOpened: (open: boolean) => void;
  priorityLevelOpened: boolean;
  setPriorityLevelOpened: (open: boolean) => void;
  assigneeOpened: boolean;
  setAssigneeOpened: (open: boolean) => void;
  subjectOpened: boolean;
  setSubjectOpened: (open: boolean) => void;
  machinesOpened: boolean;
  setMachinesOpened: (open: boolean) => void;
  departmentOpened: boolean;
  setDepartmentOpened: (open: boolean) => void;
  userGroupOpened: boolean;
  setUserGroupOpened: (open: boolean) => void;
  closeAllDrawers: () => void;
};

type FilterDrawerContextProviderProps = {
  children: React.ReactNode;
};

const FilterDrawerContext = createContext<FilterDrawerState | undefined>(
  undefined
);

const FilterDrawerContextProvider = ({
  children,
}: FilterDrawerContextProviderProps) => {
  const [statusOpened, setStatusOpened] = useState(false);
  const [priorityLevelOpened, setPriorityLevelOpened] = useState(false);
  const [assigneeOpened, setAssigneeOpened] = useState(false);
  const [subjectOpened, setSubjectOpened] = useState(false);
  const [machinesOpened, setMachinesOpened] = useState(false);
  const [departmentOpened, setDepartmentOpened] = useState(false);
  const [userGroupOpened, setUserGroupOpened] = useState(false);

  const closeAllDrawers = () => {
    setStatusOpened(false);
    setPriorityLevelOpened(false);
    setAssigneeOpened(false);
    setSubjectOpened(false);
    setMachinesOpened(false);
    setDepartmentOpened(false);
    setUserGroupOpened(false);
  };

  return (
    <FilterDrawerContext.Provider
      value={{
        statusOpened,
        setStatusOpened,
        priorityLevelOpened,
        setPriorityLevelOpened,
        assigneeOpened,
        setAssigneeOpened,
        machinesOpened,
        setMachinesOpened,
        subjectOpened,
        setSubjectOpened,
        departmentOpened,
        setDepartmentOpened,
        userGroupOpened,
        setUserGroupOpened,
        closeAllDrawers,
      }}
    >
      {children}
    </FilterDrawerContext.Provider>
  );
};

const useFilterDrawer = () => {
  const context = useContext(FilterDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useFilterDrawer must be used within the FilterDrawerContextProvider"
    );
  }

  return context;
};

export { FilterDrawerContextProvider, useFilterDrawer };
