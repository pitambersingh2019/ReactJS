import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { StyledSearchBar } from "./search-bar.styles";
import icon from "../../../../../assets/icons/tasks-management/search.svg";
import { useSearchContext } from "../../../context/useSearch";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const { handleSearchInputChange } = useSearchContext();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearchInputChange(e.target.value);
  };

  return (
    <StyledSearchBar>
      <img src={icon} alt="search icon" />
      <input
        placeholder={t(translations.TasksManagement.SearchTasks)}
        value={value}
        onChange={onValueChange}
      />
    </StyledSearchBar>
  );
}
