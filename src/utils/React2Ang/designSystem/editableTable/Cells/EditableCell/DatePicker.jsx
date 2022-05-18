/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import moment from "moment";
import DatePicker from "../../../../../../Component/DesignSystem/DatePicker";
import { DateFormat } from "../../../../../../Component/DesignSystem/DatePicker/types";
export const DatePickerEditable = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  const [record, setRecord] = React.useState({ ...cell.value, value: "" });

  const date = useMemo(
    () => ({
      format: DateFormat.DD_MM_YY_HH_MM,
      inputString: record.value ?? "",
    }),
    [record.value]
  );
  const handleDatePicked = (dateobj) => {
    const isNewRow = record.AddRow;
    if (typeof dateobj === "object") {
      setRecord((prev) => ({
        ...prev,
        value: dateobj.dateString,
      }));
      UpdateData(
        index,
        cell.column.id,
        { ...record, value: dateobj.dateString },
        isNewRow
      );
    } else {
      setRecord((prev) => ({ ...prev, value: dateobj }));
    }
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    const formattedDate = moment(
      cell.value.value,
      "DD/MM/YYYY HH:mm:ss"
    ).format(DateFormat.DD_MM_YY_HH_MM);
    setRecord({ ...cell.value, value: formattedDate });
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
    <div style={{ width: "100%" }}>
      <DatePicker
        onDateChange={handleDatePicked}
        required={false}
        selected={date}
      />
    </div>
  );
};

export const DatePickerFixed = ({ row: { index }, cell }) => {
  const date = useMemo(() => {
    const d = moment(cell.value.value, "DD/MM/YYYY HH:mm:ss");
    if (d.isValid()) return cell.value.value;
    return null;
  }, [cell.value]);
  return date;
};
