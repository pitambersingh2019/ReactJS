import React from "react";
import { LoadFilterWrapper, TitleLoadFilter, DropDownWrapper } from "./styles";
// import Dropdown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
// import { DropDownMode } from "../../../../../Component/DesignSystem/DropDown/types";
import DropDownFilter from "./SavedFilterSets/SavedFilterSets";
const LoadFilter = ({
  selectedFilterSet,
  setSelectedFilterSet,
  filterSets,
  handleRemoveFilterSet,
  setListItems,
}) => {
  return (
    <LoadFilterWrapper>
      <TitleLoadFilter>Load Saved Filter Set</TitleLoadFilter>
      <DropDownWrapper>
        <DropDownFilter
          items={filterSets}
          setSelectedFilterSet={setSelectedFilterSet}
          selectedFilterSet={selectedFilterSet}
          handleRemoveFilterSet={handleRemoveFilterSet}
          setListItems={setListItems}
        />

        {/* <Dropdown
          placeholder={"Select a filter set"}
          required={false}
          onSelect={(item) => {
            setSelectedFilterSet(item);
          }}
          items={options}
          mode={DropDownMode.selectable}
          selectedItem={selectedFilterSet}
        /> */}
      </DropDownWrapper>
    </LoadFilterWrapper>
  );
};

export default LoadFilter;
