import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import useStatusFilterOptions from "../../../hooks/useStatusFilterOptions";
import {
  countActiveValues,
  getCheckedOptionsNames,
  toggleAllStatusFilter,
} from "../../../utils";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function StatusActiveFilter() {
  const {
    activeFilters,
    statuses,
    setStatuses,
    onFilterTasks,
    setActiveFilters,
  } = useFilter();
  const { options } = useStatusFilterOptions();
  const { setStatusOpened } = useFilterDrawer();
  const { t } = useTranslation();

  const statusCount = (statuses && countActiveValues(statuses)) || 0;

  const statusModalItems = options && getCheckedOptionsNames(options);

  const onOpenDrawer = () => {
    setStatusOpened(true);
  };

  const onDeleteFilter = () => {
    if (statuses) {
      const checkedAll = toggleAllStatusFilter({
        statuses,
        checked: true,
      });
      setStatuses(checkedAll);
      onFilterTasks({ statuses: checkedAll });
      setActiveFilters({
        ...activeFilters,
        statusFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.statusFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Status)}
          count={statusCount}
          modalItems={statusModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
