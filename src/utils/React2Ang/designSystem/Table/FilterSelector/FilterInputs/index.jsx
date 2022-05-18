import React from "react";
import { Fields_TYPES } from "../utils";
import TextInput from "./TextInput";
import NumInput from "./NumInput";
import CheckBoxInput from "./CheckBoxInput";
import DropDown from "./DropDown";
import DateInput from "./DateInput";
const FilterInput = ({ filterData, setfilterItem, initvalue, id }) => {
  switch (filterData.containSelectedItem.inputField) {
    case Fields_TYPES.TEXT_INPUT:
      return (
        <TextInput
          setfilterItem={setfilterItem}
          filterData={filterData}
          initvalue={initvalue}
          id={id}
        />
      );

    case Fields_TYPES.CHECKBOX_INPUT:
      return (
        <CheckBoxInput
          setfilterItem={setfilterItem}
          filterData={filterData}
          initvalue={initvalue}
          id={id}
        />
      );

    case Fields_TYPES.NUM_INPUT:
      return (
        <NumInput
          setfilterItem={setfilterItem}
          filterData={filterData}
          initvalue={initvalue}
          id={id}
        />
      );
    case Fields_TYPES.COMBO:
      return (
        <DropDown
          setfilterItem={setfilterItem}
          filterData={filterData}
          initvalue={initvalue}
          id={id}
        />
      );
    case Fields_TYPES.DATE_INPUT:
      return (
        <DateInput
          setfilterItem={setfilterItem}
          filterData={filterData}
          initvalue={initvalue}
          id={id}
        />
      );
    default:
      return null;
  }
};

export default FilterInput;
