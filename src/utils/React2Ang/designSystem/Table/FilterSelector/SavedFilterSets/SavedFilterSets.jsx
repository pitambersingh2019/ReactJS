import FilterSetsDropDown from "./FilterSetsDropDown";
import { Container } from "./styles";

export default function SavedFilterSets({
  items,
  setSelectedFilterSet,
  selectedFilterSet,
  handleRemoveFilterSet,
  setListItems,
}) {
  const onSetChange = (item) => {
    if (item) setSelectedFilterSet(item);
    else {
      setSelectedFilterSet(null);
      setListItems([]);
    }
  };

  return (
    <Container>
      <FilterSetsDropDown
        onSelect={onSetChange}
        items={items}
        selectedItem={selectedFilterSet}
        handleRemoveFilterSet={handleRemoveFilterSet}
        setListItems={setListItems}
        setSelectedFilterSet={setSelectedFilterSet}
      />
    </Container>
  );
}
