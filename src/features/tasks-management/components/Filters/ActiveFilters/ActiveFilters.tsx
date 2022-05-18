import { useFilter } from "../../../context/useFilter";
import SaveFilterSet from "../SaveFilterSetButton/SaveFilterSetButton";
import { ActiveFiltersContainer } from "./active-filters.styles";
import AssigneeActiveFilter from "./AssigneeActiveFilter";
import DepartmentsActiveFilter from "./DepartmentsActiveFilter";
import MachinesActiveFilter from "./MachinesActiveFilter";
import OverdueActiveFilter from "./OverdueActiveFilter";
import PriorityLevelActiveFilter from "./PriorityLevelActiveFilter";
import StatusActiveFilter from "./StatusActiveFilter";
import SubjectsActiveFilter from "./SubjectsActiveFilter";
import UserGroupActiveFilter from "./UserGroupActiveFilter";

export default function ActiveFilters() {
  const { activeFilters } = useFilter();
  const areActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <ActiveFiltersContainer>
      <OverdueActiveFilter />
      <StatusActiveFilter />
      <PriorityLevelActiveFilter />
      <SubjectsActiveFilter />
      <AssigneeActiveFilter />
      <MachinesActiveFilter />
      <DepartmentsActiveFilter />
      <UserGroupActiveFilter />
      {/* render SaveFilterSet button only when there are active filters */}
      {areActiveFilters && <SaveFilterSet />}
    </ActiveFiltersContainer>
  );
}
