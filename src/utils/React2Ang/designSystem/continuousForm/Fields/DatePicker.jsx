/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import DatePicker from "../../../../../Component/DesignSystem/DatePicker";
import { DateFormat } from "../../../../../Component/DesignSystem/DatePicker/types";
import { InputWrapper } from "./styles";
import moment from "moment";
const DatePickerField = ({ field, SaveValues, DeleteValues }) => {
  const [value, setValue] = useState({
    inputString: field.value,
    format: DateFormat.DD_MM_YYYY_HH_MM,
  });
  const handleDateChange = (date) => {
    setValue((prev) => ({ ...prev, inputString: date.dateString }));
    const toDateFormat = moment(date.dateString, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const isValid = moment(toDateFormat, "YYYY-MM-DD HH:mm:ss", true).isValid();
    if (isValid) {
      SaveValues({
        FieldName: field.Name,
        Eq: toDateFormat,
        DataType: "Date",
      });
    } else {
      DeleteValues && DeleteValues(field.Name);
    }
  };

  return (
    <InputWrapper>
      <DatePicker
        selected={value}
        onDateChange={handleDateChange}
        placeholder={field.Hint}
        Title={field.DisplayLName}
      ></DatePicker>
    </InputWrapper>
  );
};

export default DatePickerField;
