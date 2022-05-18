import { useTranslation } from "react-i18next";
import SearchField from "../../../../Component/DesignSystem/SearchField";
import { translations } from "../../../../locales/translations";
import { useSearchContext } from "../../context/useSearch";
import { SearchContainer } from "./search-bar.styles";

export default function SearchBar() {
  const { handleSearchInputChange, searchValue } = useSearchContext();

  const onValueChange = (value: string) => {
    handleSearchInputChange(value);
  };

  const { t } = useTranslation();
  return (
    <SearchContainer>
      <SearchField
        placeholder={t(translations.ProcessControlDashboard.SearchDashboards)}
        onChange={onValueChange}
        value={searchValue}
      />
    </SearchContainer>
  );
}
