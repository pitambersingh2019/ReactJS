import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../redux/hooks";
import {
  EditableCellContainer,
  ReferenceValue,
  Value,
} from "./editable-cell.styles";

type EditableCellProps = {
  value: string;
  refValue: string;
  onUpdate: (value: string) => void;
  isEditable?: boolean;
  isGreyBg?: boolean;
};

export default function EditableCell({
  value: initialValue,
  refValue,
  onUpdate,
  isEditable = true,
  isGreyBg = false,
}: EditableCellProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);

  const { showReference, isEditing } = useAppSelector(
    (state) => state.jobRecipe
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("-", "");
    const isValid = !isNaN(Number(value));
    if (isValid) {
      setValue(value);
      onUpdate(value);
    }
  };

  const referenceValue = isGreyBg ? "" : refValue || "-";

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <EditableCellContainer isGreyBg={isGreyBg}>
      <Value
        value={value}
        disabled={!isEditing || !isEditable}
        isEditing={isEditing && isEditable}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        isGreyBg={isGreyBg}
      />
      {showReference && <ReferenceValue>{referenceValue}</ReferenceValue>}
    </EditableCellContainer>
  );
}
