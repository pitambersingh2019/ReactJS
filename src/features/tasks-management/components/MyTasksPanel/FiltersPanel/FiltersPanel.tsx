import ActionButton from "../../Filters/ActionButton/ActionButton";
import ClearAll from "../../Filters/ClearAll/ClearAll";
import Departments from "../../Filters/Departments/Departments";
import DoneInDays from "../../Filters/DoneInDays/DoneInDays";
import Header from "../../Filters/Header";
import Machines from "../../Filters/Machines/Machines";
import OverdueTasks from "../../Filters/OverdueTasks/OverdueTasks";
import PriorityLevel from "../../Filters/PriorityLevel/PriorityLevel";
import SavedFilterSets from "../../Filters/SavedFilterSets/SavedFilterSets";
import Status from "../../Filters/Status/Status";
import Subject from "../../Filters/Subject/Subject";
import { ClearContainer, FiltersPanelContainer } from "./filters-panel.styles";

type FiltersPanelProps = {
  onToggleFilters: () => void;
};

export default function FiltersPanel({ onToggleFilters }: FiltersPanelProps) {
  const onFilterClose = () => {
    onToggleFilters();
  };
  return (
    <FiltersPanelContainer>
      <Header onFilterClose={onFilterClose} />
      <SavedFilterSets />
      <ClearContainer>
        <ClearAll />
      </ClearContainer>
      <OverdueTasks />
      <Status />
      <PriorityLevel />
      <Subject />
      <Machines />
      <Departments />
      <DoneInDays />
      <ActionButton onClickAdditional={onFilterClose} />
    </FiltersPanelContainer>
  );
}
