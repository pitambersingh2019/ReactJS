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

export default function DepartmentsActiveFilter() {
  const {
    levelObjects,
    setLevelObjects,
    activeFilters,
    setActiveFilters,
    onFilterTasks,
  } = useFilter();
  const { departmentOptions } = useObjectsFilterOptions();

  const { setDepartmentOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const departmentsCount =
    (levelObjects && countActiveValues(levelObjects[TaskLevel.Department])) ||
    0;

  const departmentModalItems =
    departmentOptions && getCheckedOptionsNames(departmentOptions);

  const onOpenDrawer = () => {
    setDepartmentOpened(true);
  };

  const onDeleteFilter = () => {
    if (levelObjects) {
      const checkedAll = toggleAllFilterOptions({
        options: levelObjects[TaskLevel.Department],
        checked: true,
      });
      setLevelObjects({
        ...levelObjects,
        [TaskLevel.Department]: checkedAll,
      });
      onFilterTasks({
        levelObjects: {
          ...levelObjects,
          [TaskLevel.Department]: checkedAll,
        },
      });
      setActiveFilters({
        ...activeFilters,
        departmentsFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.departmentsFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Departments)}
          count={departmentsCount}
          modalItems={departmentModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
