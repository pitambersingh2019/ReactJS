import React from "react";
import ActionButton from "./ActionButton/ActionButton";
import Assignee from "./Assignee/Assignee";
import Departments from "./Departments/Departments";
import DoneInDays from "./DoneInDays/DoneInDays";
import { Wrapper } from "./filters.styles";
import Header from "./Header";
import Machines from "./Machines/Machines";
import OverdueTasks from "./OverdueTasks/OverdueTasks";
import PriorityLevel from "./PriorityLevel/PriorityLevel";
import SaveClearRow from "./SaveClearRow/SaveClearRow";
import SavedFilterSets from "./SavedFilterSets/SavedFilterSets";
import Status from "./Status/Status";
import Subject from "./Subject/Subject";
import UserGroup from "./UserGroup/UserGroup";

type FiltersProps = {
  onToggleFilters: () => void;
  containerHeight: number;
};

const Filters = React.forwardRef<HTMLDivElement, FiltersProps>(
  ({ onToggleFilters, containerHeight }, ref) => {
    const onFiltersClose = () => {
      onToggleFilters();
    };
    return (
      <Wrapper ref={ref} maxHeight={containerHeight}>
        <Header onFilterClose={onFiltersClose} />
        <SavedFilterSets />
        <SaveClearRow />
        <OverdueTasks />
        <Status />
        <PriorityLevel />
        <Subject />
        <Assignee />
        <Machines />
        <Departments />
        <UserGroup />
        <DoneInDays />
        <ActionButton />
      </Wrapper>
    );
  }
);

Filters.displayName = "Filters";

export default Filters;
