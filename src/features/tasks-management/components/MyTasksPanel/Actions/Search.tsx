import { ActionsTooltip, SearchIcon, SearchIconContainer } from "./styles";
import searchIcon from "../../../../../assets/icons/tasks-management/search.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

type SearchProps = {
  onClick: () => void;
};

export default function Search({ onClick }: SearchProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const { t } = useTranslation();
  return (
    <SearchIconContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SearchIcon src={searchIcon} alt="search icon" onClick={onClick} />
      {showTooltip && (
        <ActionsTooltip isSearch>
          {t(translations.TasksManagement.Search)}
        </ActionsTooltip>
      )}
    </SearchIconContainer>
  );
}
