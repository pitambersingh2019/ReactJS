/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef } from "react";
import InputTextField from "../Components/InputText";
const EditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setRecord] = React.useState(cell.value);
  const updated = useRef(null);
  const onChange = (value) => {
    setRecord((prev) => ({ ...prev, value: value }));
    updated.current = true;
  };
  // We'll only update the external data when the input is blurred
  const onBlur = (text) => {
    if (updated.current) {
      const isNewRow = record.AddRow;
      UpdateData(index, cell.column.id, record, isNewRow);
    }
    updated.current = false;
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setRecord(cell.value);
  }, [cell.value]);

  React.useEffect(() => {
    if (!record.AllowNull) {
      if (!record.value) {
        ValidationError(index, cell.column.id, true);
      } else {
        ValidationError(index, cell.column.id, false);
      }
    }
  }, [ValidationError, cell.column.id, index, record]);

  return (
    <>
      <InputTextField
        value={record.value}
        onChange={onChange}
        onBlur={onBlur}
        required={false}
      />
    </>
  );
};

export default React.memo(EditableCell);
