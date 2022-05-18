/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import CheckBox from "../../../../../../Component/DesignSystem/CheckBox";

const EditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setRecord] = React.useState(cell.value);
  const onChange = () => {
    const newVal = record.value === "True" ? "False" : "True";
    setRecord((prev) => ({
      ...prev,
      value: newVal,
    }));
    const isNewRow = record.AddRow;
    UpdateData(index, cell.column.id, { ...record, value: newVal }, isNewRow);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setRecord(cell.value);
  }, [cell.value, index]);

  return (
    <CheckBox
      checked={record.value === "True" ? true : false}
      onChange={onChange}
    />
  );
};

export default React.memo(EditableCell);
