/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import moment from "moment";
export const TimePickerEditable = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  const [record, setRecord] = React.useState(cell.value);

  const handleOnChange = (time) => {
    const newTime = moment(time, "HH:mm").format("DD/MM/YYYY HH:mm:ss");
    setRecord((prev) => ({ ...prev, value: newTime }));
    const isNewRow = record.AddRow;
    UpdateData(index, cell.column.id, { ...record, value: newTime }, isNewRow);
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
    <div style={{ width: "100%", height: "100%" }}>
      {/* {moment(record.value, "DD/MM/YYYY HH:mm:ss").format("HH:mm")}
      __
      {record.value} */}
      <input
        style={{ width: "100%", height: "100%" }}
        type="time"
        id="appt"
        name="appt"
        value={moment(record.value, "DD/MM/YYYY HH:mm:ss").format("HH:mm")}
        onChange={(ev) => handleOnChange(ev.target.value)}
      />
    </div>
  );
};

export const TimePickerFixed = ({ row: { index }, cell }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {moment(cell.value.value, "DD/MM/YYYY HH:mm:ss").format("HH:mm")}
    </div>
  );
};
