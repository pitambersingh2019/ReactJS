import { CellProps } from "react-table";
import { loadStateLang } from "../../../../../../../AppStart";
import useProductionParamCellEditable from "../../../../../hooks/useProductionParamCellEditable";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateProductionParameters } from "../../../../../redux/slice";
import { Split } from "../../../../../ts";
import ComboCell from "./ComboCell/ComboCell";
import EditableCell from "./EditableCell/EditableCell";
import EditableCheckboxCell from "./EditableCheckboxCell/EditableCheckboxCell";

export default function ValueCell(
  props: CellProps<Split & { referenceJobRecipeValue: string }>
) {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.jobRecipe.isEditing);

  const lang = JSON.parse(loadStateLang());

  const { ProductRecipeID, LValue, HValue, DisplayType } = props.row.original;

  const onUpdate = (value: string) => {
    props.updateData(props.row.index, props.column.id, value);
    dispatch(
      updateProductionParameters({
        RecipeID: ProductRecipeID,
        FValue: value,
        LValue: LValue,
        HValue: HValue,
      })
    );
  };

  const { isEditable } = useProductionParamCellEditable(
    props.row.original,
    "value"
  );

  const isBoolean = DisplayType === "Boolean";
  const isCombo = DisplayType === "combo";

  const booleanRefValue =
    props.row.original.referenceJobRecipeValue === ""
      ? null
      : props.row.original.referenceJobRecipeValue === "True" ||
        props.row.original.referenceJobRecipeValue === "true";

  const initValue = isCombo
    ? props.row.original.ComboValues.find((item) => item.isDefault)?.[
        lang === "eng" ? "ComboQueryEField" : "ComboQueryHField"
      ]
    : props.value;

  if (isBoolean && isEditable) {
    return (
      <EditableCheckboxCell
        value={props.value === "True" || props.value === "true"}
        refValue={booleanRefValue}
        onUpdate={onUpdate}
      />
    );
  }

  if (isCombo && isEditing && isEditable) {
    const comboValues = props.row.original.ComboValues.map((item) => ({
      label: lang === "eng" ? item.ComboQueryEField : item.ComboQueryHField,
      value: item.ComboValueField,
    }));
    const selectedItem = comboValues.find(
      (item) =>
        item.value ===
        props.row.original.ComboValues.find((item) => item.isDefault)
          ?.ComboValueField
    );
    return (
      <ComboCell
        onSelect={onUpdate}
        items={comboValues}
        selectedItem={selectedItem}
      />
    );
  }

  return (
    <EditableCell
      value={initValue || "-"}
      refValue={props.row.original.referenceJobRecipeValue}
      onUpdate={onUpdate}
      isEditable={isEditable}
    />
  );
}
