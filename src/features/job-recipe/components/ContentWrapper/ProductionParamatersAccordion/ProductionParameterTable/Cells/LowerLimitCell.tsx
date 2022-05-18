import { CellProps } from "react-table";
import useProductionParamCellEditable from "../../../../../hooks/useProductionParamCellEditable";
import { useAppDispatch } from "../../../../../redux/hooks";
import { updateProductionParameters } from "../../../../../redux/slice";
import { Split } from "../../../../../ts";
import EditableCell from "./EditableCell/EditableCell";

export default function LowerLimitCell(
  props: CellProps<Split & { referenceJobRecipeLowerLimit: string }>
) {
  const dispatch = useAppDispatch();

  const {
    ProductRecipeID,
    FValue,
    HValue,
    RecipeLValue,
    referenceJobRecipeLowerLimit,
    DisplayType,
  } = props.row.original;

  const onUpdate = (value: string) => {
    props.updateData(props.row.index, props.column.id, value);
    dispatch(
      updateProductionParameters({
        RecipeID: ProductRecipeID,
        FValue: FValue,
        LValue: Number(value),
        HValue: HValue,
      })
    );
  };

  const isBoolean = DisplayType === "Boolean";
  const isCombo = DisplayType === "combo";

  const value = isBoolean || isCombo ? "" : RecipeLValue ? props.value : "-";

  const { isEditable } = useProductionParamCellEditable(
    props.row.original,
    "lowerLimit"
  );

  return (
    <EditableCell
      value={value}
      refValue={referenceJobRecipeLowerLimit}
      onUpdate={onUpdate}
      isEditable={isEditable && !isBoolean && !isCombo && RecipeLValue}
      isGreyBg={isBoolean || isCombo}
    />
  );
}
