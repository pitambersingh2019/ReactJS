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

export default function UserGroupActiveFilter() {
  const {
    levelObjects,
    setLevelObjects,
    activeFilters,
    setActiveFilters,
    onFilterTasks,
  } = useFilter();
  const { userGroupOptions } = useObjectsFilterOptions();

  const { setUserGroupOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const userGroupsCount =
    (levelObjects && countActiveValues(levelObjects[TaskLevel.UserGroup])) || 0;

  const userGroupModalItems =
    userGroupOptions && getCheckedOptionsNames(userGroupOptions);

  const onOpenDrawer = () => {
    setUserGroupOpened(true);
  };

  const onDeleteFilter = () => {
    if (levelObjects) {
      const checkedAll = toggleAllFilterOptions({
        options: levelObjects[TaskLevel.UserGroup],
        checked: true,
      });
      setLevelObjects({
        ...levelObjects,
        [TaskLevel.UserGroup]: checkedAll,
      });
      onFilterTasks({
        levelObjects: {
          ...levelObjects,
          [TaskLevel.UserGroup]: checkedAll,
        },
      });
      setActiveFilters({
        ...activeFilters,
        userGroupFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.userGroupFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.UserGroup)}
          count={userGroupsCount}
          modalItems={userGroupModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
