import { useRef } from "react";
import checkbox from "../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../assets/icons/checkbox-checked-purple.svg";
import { Checkbox, DisabledCheckbox, StyledCell } from "./cell-fixed.styles";
import checkboxDisabled from "../../../../assets/icons/tasks-management/checkbox_disabled.svg";

export default function CellFixed({
  value,
  isEditing,
  setValue,
  column: { id: columnId },
  isFixedDisabled,
  row,
}) {
  const initValue = useRef(value);

  const onChange = () => {
    if (isEditing) {
      setValue(!value, columnId, true);
    }
  };
  const isDepartmentLevelDisabled =
    row.depth === 1 && isFixedDisabled.departmentShouldDisable;

  const isMachineLevelDisabled =
    row.depth === 2 &&
    isFixedDisabled.machineShouldDisable[row.id.substring(0, 3)];

  const isDisabled =
    (isDepartmentLevelDisabled || isMachineLevelDisabled) &&
    !value &&
    initValue.current === value;

  return (
    <StyledCell>
      {isDisabled && isEditing ? (
        <DisabledCheckbox src={checkboxDisabled} />
      ) : (
        <Checkbox
          src={value ? checkboxChecked : checkbox}
          alt="checkbox"
          onClick={onChange}
        />
      )}
    </StyledCell>
  );
}
