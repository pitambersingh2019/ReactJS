import { useEffect, useState } from "react";
import { useSearchFieldState } from "../context/SearchFieldContext";
import { useSortFieldState } from "../context/SortFieldsContext";
import { IterfaceDataItem } from "../ts";

export default function useSortFields(tableFields: IterfaceDataItem[]) {
  const [sortedFields, setSortedFields] = useState(tableFields);
  const [resultFields, setResultFields] = useState(tableFields);
  const { selectedOption } = useSortFieldState();
  const { searchValue } = useSearchFieldState();

  useEffect(() => {
    const fieldsArrayCopy = [...tableFields];

    if (selectedOption === "alphabetical") {
      fieldsArrayCopy.sort((a, b) =>
        a.MandatoryFields.localeCompare(b.MandatoryFields)
      );
    }
    if (selectedOption === "required") {
      fieldsArrayCopy.sort((a, b) =>
        a.AllowNull === b.AllowNull ? 0 : b.AllowNull ? -1 : 1
      );
    }
    setSortedFields(fieldsArrayCopy);
  }, [selectedOption, tableFields]);

  useEffect(() => {
    if (searchValue) {
      const filteredFields = sortedFields.filter((field) =>
        field.MandatoryFields.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResultFields(filteredFields);
    } else {
      setResultFields(sortedFields);
    }
  }, [searchValue, sortedFields]);

  return { resultFields };
}
