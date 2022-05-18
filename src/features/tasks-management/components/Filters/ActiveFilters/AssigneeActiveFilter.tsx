import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useAssigneeFilterOptions from "../../../hooks/useAssigneeFilterOptions";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import {
  countActiveValues,
  getCheckedOptionsNames,
  toggleAllFilterOptions,
} from "../../../utils";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function AssigneeActiveFilter() {
  const {
    assigneeDisplayName,
    setAssigneeDisplayName,
    activeFilters,
    setActiveFilters,
    onFilterTasks,
  } = useFilter();
  const { options: assigneeOptions } = useAssigneeFilterOptions();

  const { setAssigneeOpened } = useFilterDrawer();

  const { t } = useTranslation();

  assigneeDisplayName && delete assigneeDisplayName["visible"];

  const assigneesCount =
    (assigneeDisplayName && countActiveValues(assigneeDisplayName)) || 0;

  const assigneesModalItems =
    assigneeOptions && getCheckedOptionsNames(assigneeOptions);

  const onOpenDrawer = () => {
    setAssigneeOpened(true);
  };

  const onDeleteFilter = () => {
    if (assigneeDisplayName) {
      const checkedAll = toggleAllFilterOptions({
        options: assigneeDisplayName,
        checked: true,
      });
      setAssigneeDisplayName(checkedAll);
      onFilterTasks({ assigneeDisplayName: checkedAll });
      setActiveFilters({
        ...activeFilters,
        assigneeFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.assigneeFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Assignee)}
          count={assigneesCount}
          modalItems={assigneesModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
