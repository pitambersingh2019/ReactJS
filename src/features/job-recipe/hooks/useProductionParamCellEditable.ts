import { useCallback, useEffect, useState } from "react";
import { Split } from "../ts";

export type CellType = "value" | "lowerLimit" | "upperLimit";

export default function useProductionParamCellEditable(
  split: Split,
  cellType: CellType
) {
  const [isEditable, setIsEditable] = useState(false);
  const {
    AllowEdit,
    IsEditable,
    IsEnabled,
    CalcUpdateOption,
    FValueCalcFunction,
    SourceTable,
    LValueCalcFunction,
    HValueCalcFunction,
  } = split;

  const getCalcCondition = useCallback(() => {
    switch (cellType) {
      case "value":
        return (
          (CalcUpdateOption === 3 && FValueCalcFunction === "") ||
          CalcUpdateOption !== 3
        );
      case "lowerLimit":
        return LValueCalcFunction === "";
      case "upperLimit":
        return HValueCalcFunction === "";
      default:
        return false;
    }
  }, [
    CalcUpdateOption,
    FValueCalcFunction,
    HValueCalcFunction,
    LValueCalcFunction,
    cellType,
  ]);

  useEffect(() => {
    const isEditableCondition1 = getCalcCondition();

    const isEditableCondition2 = SourceTable === "";

    const isEditable =
      (AllowEdit || IsEditable || IsEnabled) &&
      isEditableCondition1 &&
      isEditableCondition2;

    setIsEditable(isEditable);
  }, [AllowEdit, IsEditable, IsEnabled, SourceTable, getCalcCondition]);

  return { isEditable };
}
