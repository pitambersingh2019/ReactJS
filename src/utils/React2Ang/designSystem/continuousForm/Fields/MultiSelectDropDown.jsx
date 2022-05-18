/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import MultiDropDown from "../../../../../Component/DesignSystem/DropDown/MultiSelect";
import { InputWrapper } from "./styles";
const MultiSelectField = ({ field, SaveValues }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const options = field.comboValues.map((elem) => {
      return { value: elem.ComboValueField, label: elem["ComboQueryEField"] };
    });
    setItems(options);
  }, [field.comboValues]);

  const handleMultiDropDownChange = (items) => {
    SaveValues &&
      SaveValues({
        FieldName: field.Name,
        INclause: items.length ? items.map((elem) => elem.value) : "",
        DataType: "num",
      });
  };

  return (
    <InputWrapper>
      <MultiDropDown
        placeholder={"Select options"}
        onSelect={handleMultiDropDownChange}
        TitleText={field.DisplayLName}
        items={items}
        searchable={true}
      />
    </InputWrapper>
  );
};

export default MultiSelectField;
