import { CellProps } from "react-table";
import useProductionParamCellEditable from "../../../../../hooks/useProductionParamCellEditable";
import { useAppDispatch } from "../../../../../redux/hooks";
import { updateProductionParameters } from "../../../../../redux/slice";
import { Split } from "../../../../../ts";
import EditableCell from "./EditableCell/EditableCell";

export default function UpperLimitCell(
  props: CellProps<Split & { referenceJobRecipeUpperLimit: string }>
) {
  const dispatch = useAppDispatch();

  const { ProductRecipeID, RecipeHValue, FValue, LValue, DisplayType } =
    props.row.original;

  const onUpdate = (value: string) => {
    props.updateData(props.row.index, props.column.id, value);
    dispatch(
      updateProductionParameters({
        RecipeID: ProductRecipeID,
        FValue: FValue,
        LValue: LValue,
        HValue: Number(value),
      })
    );
  };

  const isBoolean = DisplayType === "Boolean";
  const isCombo = DisplayType === "combo";

  const value = isBoolean || isCombo ? "" : RecipeHValue ? props.value : "-";

  const { isEditable } = useProductionParamCellEditable(
    props.row.original,
    "upperLimit"
  );

  return (
    <EditableCell
      value={value}
      refValue={props.row.original.referenceJobRecipeUpperLimit}
      onUpdate={onUpdate}
      isEditable={isEditable && !isBoolean && !isCombo && RecipeHValue}
      isGreyBg={isBoolean || isCombo}
    />
  );
}
