import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import useSubjectFilterOptions from "../../../hooks/useSubjectFilterOptions";
import {
  countActiveValues,
  getCheckedOptionsNames,
  toggleAllFilterOptions,
} from "../../../utils";
import ActiveFilterItem from "../ActiveFilterItem/ActiveFilterItem";

export default function SubjectsActiveFilter() {
  const {
    subjects,
    setSubjects,
    activeFilters,
    setActiveFilters,
    onFilterTasks,
  } = useFilter();
  const { options: subjectOptions } = useSubjectFilterOptions();

  const { setSubjectOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const subjectsCount = (subjects && countActiveValues(subjects)) || 0;

  const subjectModalItems =
    subjectOptions && getCheckedOptionsNames(subjectOptions);

  const onOpenDrawer = () => {
    setSubjectOpened(true);
  };

  const onDeleteFilter = () => {
    if (subjects) {
      const checkedAll = toggleAllFilterOptions({
        options: subjects,
        checked: true,
      });
      setSubjects(checkedAll);
      onFilterTasks({ subjects: checkedAll });
      setActiveFilters({
        ...activeFilters,
        subjectsFilterIsActive: false,
      });
    }
  };

  return (
    <>
      {activeFilters.subjectsFilterIsActive && (
        <ActiveFilterItem
          label={t(translations.TasksManagement.Subject)}
          count={subjectsCount}
          modalItems={subjectModalItems}
          onOpenDrawer={onOpenDrawer}
          onDelete={onDeleteFilter}
        />
      )}
    </>
  );
}
