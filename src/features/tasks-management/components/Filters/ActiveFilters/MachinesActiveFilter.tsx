import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import useObjectsFilterOptions from "../../../hooks/useObjectsFilterOptions";
import { TaskLevel } from "../../../ts";
import {
  countActiveValues,
  getCheckedOptionsNames,
  toggleAllFilterOptions,
} from "../../../utils";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function MachinesActiveFilter() {
  const {
    levelObjects,
    setLevelObjects,
    activeFilters,
    setActiveFilters,
    onFilterTasks,
  } = useFilter();
  const { machineOptions } = useObjectsFilterOptions();

  const { setMachinesOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const machinesCount =
    (levelObjects && countActiveValues(levelObjects[TaskLevel.Machine])) || 0;

  const machinesModalItems =
    machineOptions && getCheckedOptionsNames(machineOptions);

  const onOpenDrawer = () => {
    setMachinesOpened(true);
  };

  const onDeleteFilter = () => {
    if (levelObjects) {
      const checkedAll = toggleAllFilterOptions({
        options: levelObjects[TaskLevel.Machine],
        checked: true,
      });
      setLevelObjects({
        ...levelObjects,
        [TaskLevel.Machine]: checkedAll,
      });
      onFilterTasks({
        levelObjects: {
          ...levelObjects,
          [TaskLevel.Machine]: checkedAll,
        },
      });
      setActiveFilters({
        ...activeFilters,
        machinesFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.machinesFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Machines)}
          count={machinesCount}
          modalItems={machinesModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
