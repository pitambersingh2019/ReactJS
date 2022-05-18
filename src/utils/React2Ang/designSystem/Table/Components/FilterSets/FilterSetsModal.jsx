import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { FilterSetItem, FilterSetsModalContainer } from "./styles";

export default function FilterSetsModal({
  savedFilters,
  onModalClose,
  handleSetFilterFromHeaderDropDown,
}) {
  const [search, setSearch] = useState("");
  const [filterSets, setFilterSets] = useState(savedFilters);

  const { t } = useTranslation();

  const handleSearch = (text) => {
    setSearch(text);
    const foundFilterSets = savedFilters?.filter((filter) =>
      filter.value.toLowerCase().includes(text.toLowerCase())
    );
    setFilterSets(foundFilterSets);
  };

  const handleSelectFilter = (filter) => {
    handleSetFilterFromHeaderDropDown(filter);
    onModalClose();
  };

  return (
    <FilterSetsModalContainer>
      <input
        placeholder={t(translations.TasksManagement.SearchFilterSets) + "..."}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filterSets.map((f, index) => (
        <FilterSetItem
          key={index}
          onClick={() => handleSelectFilter(f)}
          // isSelected={selectedFilterSet?.value === f.FilterID}
        >
          {f.label}
        </FilterSetItem>
      ))}
    </FilterSetsModalContainer>
  );
}
