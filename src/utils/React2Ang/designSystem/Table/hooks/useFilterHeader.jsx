import { useState, useCallback, useEffect, useRef } from "react";
const useFilterHeader = (
  handleFiltering,
  saveFilterSetsAPI,
  filterSetsAPI,
  hideFilterPanel,
  initialFilters
) => {
  const [filterSets, setFilterSets] = useState([]);
  const [FilterItems, setFilterItems] = useState([]);
  const [firstTimeFilterApply, setfirstTimeFilterApply] = useState(true);
  const [selectedFilterSet, setSelectedFilterSet] = useState(undefined);
  const [showSaveFilterButton, setshowSaveFilterButton] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [editedFilter, setEditedFilter] = useState(null);
  // useEffect(() => {
  //   if (initialFilters && initialFilters.length > 0) {
  //     setFilterItems(initialFilters);
  //   }
  // }, [initialFilters]);
  useEffect(() => {
    setshowFilter(
      hideFilterPanel === true
        ? false
        : hideFilterPanel === false
        ? true
        : false
    );
  }, [hideFilterPanel]);
  useEffect(() => {
    if (hideFilterPanel === true) {
      setfirstTimeFilterApply(false);
      handleAddFilters(initialFilters);
    } else {
      setfirstTimeFilterApply(true);
    }
  }, [handleAddFilters, hideFilterPanel, initialFilters]);
  useEffect(() => {
    setFilterSets(filterSetsAPI);
    //update selected filter set too!
    if (selectedFilterSet) {
      const filter = filterSetsAPI.find(
        (elem) => elem.value === selectedFilterSet.value
      );
      setSelectedFilterSet(filter);
    }
  }, [filterSetsAPI, selectedFilterSet]);
  const handleAddFilters = useCallback(
    (filters) => {
      setFilterItems(filters);
      setfirstTimeFilterApply(false);
      handleFiltering && handleFiltering(filters);
    },
    [handleFiltering]
  );

  // useEffect(() => {
  //   if (autoApplyFilter) handleFiltering && handleFiltering(FilterItems);
  // }, [handleFiltering, autoApplyFilter, FilterItems]);

  const handleRemoveFilterFromItems = useCallback(
    (id) => {
      const newFilters = FilterItems.filter((elem) => elem.id !== id);
      setFilterItems(newFilters);
      handleFiltering && handleFiltering(newFilters);
    },
    [FilterItems, handleFiltering]
  );

  const handleEditFilterFromItems = useCallback((id) => {
    console.log("id ", id);
    setEditedFilter((prev) => (prev === null ? id : prev));
    setshowFilter(true);
  }, []);

  const handleClearFilterItems = useCallback(() => {
    setFilterItems([]);
    handleFiltering && handleFiltering([]);
  }, [handleFiltering]);

  const handleAddFilterSet = useCallback(
    (name, FilterSet) => {
      saveFilterSetsAPI &&
        saveFilterSetsAPI({ name: name, filterSet: FilterSet, type: "ADD" });
    },
    [saveFilterSetsAPI]
  );

  const handleRemoveFilterSet = useCallback(
    (id) => {
      saveFilterSetsAPI && saveFilterSetsAPI({ id: id, type: "DELETE" });
    },
    [saveFilterSetsAPI]
  );

  const handleUpdateFilterSet = useCallback(
    (id, FilterSet, filterName) => {
      saveFilterSetsAPI &&
        saveFilterSetsAPI({
          id: id,
          name: filterName,
          filterSet: FilterSet,
          type: "UPDATE",
        });
    },
    [saveFilterSetsAPI]
  );

  const handleSetFilterFromHeaderDropDown = useCallback(
    (filterSet) => {
      setSelectedFilterSet(filterSet);
      const fitleritemsfromSet = filterSet?.data;
      setFilterItems(fitleritemsfromSet);
      handleFiltering && handleFiltering(fitleritemsfromSet);
    },
    [handleFiltering]
  );

  const showFilterSaveButton = useCallback(() => {
    setshowSaveFilterButton(true);
  }, []);
  const hideFilterSaveButton = useCallback(() => {
    setshowSaveFilterButton(false);
  }, []);

  const handleClearEditItem = useCallback(() => {
    setEditedFilter(null);
  }, []);

  return [
    FilterItems,
    handleAddFilters,
    handleRemoveFilterFromItems,
    handleEditFilterFromItems,
    handleClearFilterItems,
    firstTimeFilterApply,
    selectedFilterSet,
    setSelectedFilterSet,
    handleAddFilterSet,
    handleRemoveFilterSet,
    handleUpdateFilterSet,
    filterSets,
    handleSetFilterFromHeaderDropDown,
    showSaveFilterButton,
    showFilterSaveButton,
    hideFilterSaveButton,
    showFilter,
    setshowFilter,
    editedFilter,
    handleClearEditItem,
  ];
};

export default useFilterHeader;
