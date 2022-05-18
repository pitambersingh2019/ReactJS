import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import usePriorityLevelsFilterOptions from "../../../hooks/usePriorityLevelsFilterOptions";
import {
  countActiveValues,
  getCheckedOptionsNames,
  toggleAllPriorityLevelFilter,
} from "../../../utils";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function PriorityLevelActiveFilter() {
  const {
    priorityLevels,
    setPriorityLevels,
    activeFilters,
    onFilterTasks,
    setActiveFilters,
  } = useFilter();
  const { options } = usePriorityLevelsFilterOptions();

  const { setPriorityLevelOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const priorityLevelsCount =
    (priorityLevels && countActiveValues(priorityLevels)) || 0;

  const priorityModalItems = options && getCheckedOptionsNames(options);

  const onOpenDrawer = () => {
    setPriorityLevelOpened(true);
  };

  const onDeleteFilter = () => {
    if (priorityLevels) {
      const checkedAll = toggleAllPriorityLevelFilter({
        priorityLevels,
        checked: true,
      });
      setPriorityLevels(checkedAll);
      onFilterTasks({ priorityLevels: checkedAll });
      setActiveFilters({
        ...activeFilters,
        priorityFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.priorityFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.PriorityLevel)}
          count={priorityLevelsCount}
          modalItems={priorityModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
