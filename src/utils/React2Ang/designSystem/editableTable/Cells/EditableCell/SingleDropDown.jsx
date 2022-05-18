/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from "react";
import DropDown from "../../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../Components/DropDown/types";
import styled from "styled-components";

const Text = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export const SingleDropDownEditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(cell.value);
  const [selected, setselected] = useState(
    cell.value.value !== ""
      ? cell.value.comboValues
          .map((elem) => ({
            value: elem.ComboValueField,
            label: elem.ComboQueryEField,
          }))
          .find((elem) => elem.value === +cell.value.value)
      : undefined
  );
  const options = useMemo(
    () =>
      value.comboValues.map((elem) => ({
        value: elem.ComboValueField,
        label: elem.ComboQueryEField,
      })),
    [value.comboValues]
  );

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(cell.value);

    if (!value.AllowNull) {
      if (!cell.value.value) {
        ValidationError(index, cell.column.id, true);
      } else {
        ValidationError(index, cell.column.id, false);
      }
    }
  }, [ValidationError, cell.column.id, cell.value, index, value.AllowNull]);

  const handleSelectItem = (item) => {
    const isNewRow = value.AddRow;
    UpdateData(
      index,
      cell.column.id,
      {
        ...value,
        value: item ? item.value.toString() : "",
      },
      isNewRow
    );

    if (!value.AllowNull) {
      if (!item) {
        ValidationError(index, cell.column.id, true);
      } else {
        ValidationError(index, cell.column.id, false);
      }
    }
  };

  return (
    <>
      <DropDown
        placeholder={"Select an Item"}
        onSelect={handleSelectItem}
        items={options}
        mode={DropDownMode.selectable}
        selectedItem={selected}
      />
    </>
  );
};

export const SingleDropDownFixedCell = ({ row: { index }, cell }) => {
  const label = useMemo(
    () =>
      cell.column.comboValues.find(
        (elem) => elem.ComboValueField === +cell.value.value
      ),
    [cell.column.comboValues, cell.value.value]
  );
  return label ? <Text>{label.ComboQueryEField}</Text> : null;
};
