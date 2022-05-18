import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useFilter } from "../../../../context/useFilter";
import { useSelectedFilterSet } from "../../../../context/useSelectedFilterSet";
import { useTasks } from "../../../../context/useTasks";
import { Filter, TaskLevel } from "../../../../ts";
import { areAllChecked } from "../../../../utils";
import { FilterSetItem, FilterSetsModalContainer } from "./styles";

type FilterSetsModalProps = {
  savedFilters: Filter[];
  onModalClose: () => void;
};

export default function FilterSetsModal({
  savedFilters,
  onModalClose,
}: FilterSetsModalProps) {
  const [search, setSearch] = useState("");
  const [filterSets, setFilterSets] = useState<Filter[]>(savedFilters);

  const { selectedFilterSet, setSelectedFilterSet } = useSelectedFilterSet();
  const { t } = useTranslation();

  const { onFilterTasks, setActiveFilters } = useFilter();
  const { fetchTasks } = useTasks();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    const foundFilterSets = savedFilters?.filter((filter) =>
      filter.FilterName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterSets(foundFilterSets);
  };

  const handleSelectFilter = (filter: Filter) => {
    onModalClose();
    setSelectedFilterSet({
      value: filter.FilterID,
      label: filter.FilterName,
    });

    const {
      OnlyLate,
      Priority,
      Subjects,
      TaskObject,
      AssigneeDisplayName,
      doneCancelLastXDays,
    } = filter;

    if (Number(doneCancelLastXDays) > 1) {
      fetchTasks(Number(doneCancelLastXDays) * 24);
    }

    onFilterTasks({
      showOverdueTasks: OnlyLate,
      priorityLevels: Priority,
      subjects: Subjects,
      assigneeDisplayName: AssigneeDisplayName,
      levelObjects: TaskObject,
      doneInXDays: doneCancelLastXDays.toString(),
    });
    setActiveFilters({
      overdueFilterIsActive: OnlyLate,
      priorityFilterIsActive: !areAllChecked(Object.values(Priority)),
      subjectsFilterIsActive: !areAllChecked(Object.values(Subjects)),
      assigneeFilterIsActive: !areAllChecked(
        Object.values(AssigneeDisplayName)
      ),
      machinesFilterIsActive: !areAllChecked(
        Object.values(TaskObject[TaskLevel.Machine])
      ),
      departmentsFilterIsActive: !areAllChecked(
        Object.values(TaskObject[TaskLevel.Department])
      ),
      userGroupFilterIsActive: !areAllChecked(
        Object.values(TaskObject[TaskLevel.UserGroup])
      ),
    });
  };

  return (
    <FilterSetsModalContainer>
      <input
        placeholder={t(translations.TasksManagement.SearchFilterSets) + "..."}
        value={search}
        onChange={handleSearch}
      />
      {filterSets.map((f) => (
        <FilterSetItem
          key={f.FilterID}
          onClick={() => handleSelectFilter(f)}
          isSelected={selectedFilterSet?.value === f.FilterID}
        >
          {f.FilterName}
        </FilterSetItem>
      ))}
    </FilterSetsModalContainer>
  );
}
