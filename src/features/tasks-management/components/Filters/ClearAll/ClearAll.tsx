import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";
import { useTasks } from "../../../context/useTasks";
import { ClearContainer } from "./clear-all.styles";

export default function ClearAll() {
  const { t } = useTranslation();

  const { resetFilters, setFiltersApplied } = useFilter();
  const { setSelectedFilterSet } = useSelectedFilterSet();
  const { fetchTasks } = useTasks();

  const onCLearAll = () => {
    resetFilters();
    setSelectedFilterSet(undefined);
    fetchTasks(24, () => setFiltersApplied(false));
  };

  return (
    <ClearContainer onClick={onCLearAll}>
      {t(translations.TasksManagement.ClearAll)}
    </ClearContainer>
  );
}
