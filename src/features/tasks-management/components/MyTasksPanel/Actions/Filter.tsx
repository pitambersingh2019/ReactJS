import filterIcon from "../../../../../assets/icons/filter_new.svg";
import filterBlueIcon from "../../../../../assets/icons/tasks-management/filter-blue.svg";
import { ActionsTooltip, FilterContainer, FilterIcon } from "./styles";
import { useFilter } from "../../../context/useFilter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

type FilterProps = {
  onShowFilters: () => void;
};

export default function Filter({ onShowFilters }: FilterProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const { t } = useTranslation();
  const { filtersApplied } = useFilter();
  return (
    <FilterContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <FilterIcon
        src={filtersApplied ? filterBlueIcon : filterIcon}
        alt="filter icon"
        onClick={onShowFilters}
      />
      {showTooltip && (
        <ActionsTooltip>
          {t(translations.TasksManagement.Filters)}
        </ActionsTooltip>
      )}
    </FilterContainer>
  );
}
