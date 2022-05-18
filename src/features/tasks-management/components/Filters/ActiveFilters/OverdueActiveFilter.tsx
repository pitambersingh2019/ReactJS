import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function OverdueActiveFilter() {
  const {
    activeFilters,
    setShowOverdueTasks,
    onFilterTasks,
    setActiveFilters,
  } = useFilter();

  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onOpenDrawer = () => {};

  const onDeleteFilter = () => {
    setShowOverdueTasks(false);
    onFilterTasks({ showOverdueTasks: false });
    setActiveFilters({
      ...activeFilters,
      overdueFilterIsActive: false,
    });
  };
  return (
    <>
      {activeFilters.overdueFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Overdue)}
          count={1}
          modalItems={[]}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
