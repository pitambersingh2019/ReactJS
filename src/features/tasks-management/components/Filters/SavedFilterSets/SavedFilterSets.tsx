import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import { useFilter } from "../../../context/useFilter";
import { useSavedFilters } from "../../../context/useSavedFilters";
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";
import FilterSetsDropDown from "./FilterSetsDropDown";
import { Container } from "./styles";

export default function SavedFilterSets() {
  const { selectedFilterSet, setSelectedFilterSet } = useSelectedFilterSet();

  const { savedFilters } = useSavedFilters();
  const { setFiltersApplied } = useFilter();

  const items: Item[] | undefined =
    savedFilters &&
    savedFilters.map((filter) => ({
      value: filter.FilterID,
      label: filter.FilterName,
    }));

  const onSetChange = (item: Item | undefined) => {
    setSelectedFilterSet(item);
    setFiltersApplied(false);
  };

  return (
    <Container>
      <FilterSetsDropDown
        onSelect={onSetChange}
        items={items || [{ value: 0, label: "" }]}
        selectedItem={selectedFilterSet}
      />
    </Container>
  );
}
