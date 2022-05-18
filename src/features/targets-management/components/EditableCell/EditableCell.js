import { useEffect, useState } from "react";

import { StyledEditableCell } from "./editable-cell.styles";

export default function EditableCell({
  column: { id: columnId },
  isEditing,
  willUpdate,
  value,
  setValue,
}) {
  const [isValid, setIsValid] = useState(undefined);
  const [updated, setUpdated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const checkIsValid = (value) =>
    value.replace("%", "") >= 0 && value.replace("%", "") <= 100;

  useEffect(() => {
    if (updated) {
      setIsValid(checkIsValid(value));
    }
  }, [value, updated]);

  const onChange = (e) => {
    const targetValue = e.value;
    if (checkIsValid(targetValue)) {
      setIsValid(true);
      setValue(targetValue, columnId, true);
    } else {
      setIsValid(false);
      setValue(targetValue, columnId, false);
    }
    setUpdated(true);
  };

  return (
    <StyledEditableCell
      value={value}
      onValueChange={onChange}
      editing={isEditing.toString()}
      willupdate={willUpdate.toString()}
      readOnly={!isEditing}
      suffix="%"
      isvalid={isValid?.toString()}
      onFocus={() => setIsFocused(true)}
      isfocused={isFocused.toString()}
      onBlur={() => setIsFocused(false)}
    />
  );
}
