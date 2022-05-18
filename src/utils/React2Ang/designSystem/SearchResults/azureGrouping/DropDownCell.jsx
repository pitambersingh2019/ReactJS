import React, { useState, useEffect, useMemo } from "react";
import DropDown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../../Component/DesignSystem/DropDown/types";

const SingleDropDownEditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setrecord] = useState(cell.value);
  const selected = useMemo(
    () =>
      record.value !== ""
        ? cell.column.Filteroptions.find((elem) => elem.value === record.value)
        : undefined,
    [cell.column.Filteroptions, record.value]
  );
  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setrecord(cell.value);
  }, [cell.column.id, cell.value, index]);

  const handleSelectItem = (item) => {
    const isNewRow = record.AddRow;
    UpdateData(
      index,
      cell.column.id,
      {
        ...record,
        value: item ? item.value.toString() : "",
      },
      isNewRow
    );
  };

  useEffect(() => {
    if (!record.value) {
      ValidationError(index, cell.column.id, true);
    } else {
      ValidationError(index, cell.column.id, false);
    }
  }, [ValidationError, cell.column.id, index, record]);

  return (
    <>
      <DropDown
        placeholder={"Select an Item"}
        onSelect={handleSelectItem}
        items={cell.column.Filteroptions}
        mode={DropDownMode.selectable}
        selectedItem={selected}
      />
    </>
  );
};

export default SingleDropDownEditableCell;
