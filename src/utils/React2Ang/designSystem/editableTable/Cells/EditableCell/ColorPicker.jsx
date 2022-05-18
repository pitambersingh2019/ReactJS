/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ColorPicker from "../../../../../../Component/DesignSystem/ColorPicker";
const EditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setRecord] = React.useState(cell.value);

  const onChange = (HexColor) => {
    setRecord((prev) => ({
      ...prev,
      value: HexColor,
    }));
    const isNewRow = record.AddRow;
    UpdateData(index, cell.column.id, { ...record, value: HexColor }, isNewRow);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setRecord(cell.value);
  }, [cell.value, index]);

  return (
    <>
      <ColorPicker
        SelectedColor={record.value}
        onSelectColor={(HexColor) => onChange(HexColor)}
      />
    </>
  );
};

export default EditableCell;
