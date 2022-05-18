/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from "react";
import DatePicker from "../../../../../../Component/DesignSystem/DatePicker";
import { DateFormat } from "../../../../../../Component/DesignSystem/DatePicker/types";
import { FILTER_OPTIONS } from "../utils";
const DateInputComp = ({ setfilterItem, filterData, initvalue, id }) => {
  console.log("initvalue", initvalue);

  const [date, SetDate] = useState({
    format: DateFormat.DD_MM_YY_HH_MM,
    inputString: initvalue ? initvalue["date1"]?.inputString : "",
  });
  const [date2, SetDate2] = useState({
    format: DateFormat.DD_MM_YY_HH_MM,
    inputString: initvalue ? initvalue["date2"]?.inputString : "",
  });

  const checkValidDates = useCallback(() => {
    if (filterData.containSelectedItem.label === FILTER_OPTIONS.BETWEEN) {
      if (date.inputString && date2.inputString) return true;
      return false;
    } else {
      if (date.inputString) return true;
      return false;
    }
  }, [
    date.inputString,
    date2.inputString,
    filterData.containSelectedItem.label,
  ]);

  useEffect(() => {
    setfilterItem &&
      setfilterItem({
        ...filterData,
        id: id,
        val: { date1: date, date2: date2 },
        valid: checkValidDates() ? true : false,
        text: filterData.containSelectedItem.text(filterData, {
          date1: date,
          date2: date2,
        }),
      });
  }, [checkValidDates, date, date2, filterData, id, setfilterItem]);
  const handleDate1Picked = (dateobj) => {
    if (typeof dateobj === "object") {
      SetDate((prev) => ({
        ...prev,
        inputString: dateobj.dateString,
      }));
    } else {
      SetDate((prev) => ({ ...prev, inputString: dateobj }));
    }
  };

  const handleDate2Picked = (dateobj) => {
    if (typeof dateobj === "object") {
      SetDate2((prev) => ({
        ...prev,
        inputString: dateobj.dateString,
      }));
    } else {
      SetDate2((prev) => ({ ...prev, inputString: dateobj }));
    }
  };

  return (
    <>
      {filterData.containSelectedItem.label === FILTER_OPTIONS.BETWEEN ? (
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <DatePicker
            Title="Value"
            onDateChange={handleDate1Picked}
            required={false}
            selected={date}
          />
          <DatePicker
            Title="Value"
            onDateChange={handleDate2Picked}
            required={false}
            selected={date2}
          />
        </div>
      ) : (
        <DatePicker
          Title="Value"
          onDateChange={handleDate1Picked}
          required={false}
          selected={date}
        />
      )}
    </>
  );
};

export default DateInputComp;
