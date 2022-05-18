/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";
import SingleDropDown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { InputWrapper } from "./styles";
const BooleanDropDown = ({ field, SaveValues }) => {
  const items = useMemo(
    () => [
      { value: 0, label: "FALSE" },
      { value: 1, label: "TRUE" },
    ],
    []
  );

  const handleChange = (item) => {
    console.log(item);
    SaveValues({
      FieldName: field.Name,
      Eq: item ? item.value : "",
      DataType: "True/False",
    });
  };

  return (
    <InputWrapper>
      <SingleDropDown
        placeholder={"Select options"}
        onSelect={handleChange}
        TitleText={field.DisplayLName}
        items={items}
        searchable={false}
      />
    </InputWrapper>
  );
};

export default BooleanDropDown;
