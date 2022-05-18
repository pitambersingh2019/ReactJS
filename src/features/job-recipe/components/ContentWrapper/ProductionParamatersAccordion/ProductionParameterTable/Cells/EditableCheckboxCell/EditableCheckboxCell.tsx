import { useAppSelector } from "../../../../../../redux/hooks";
import CheckboxComponent from "../../../../../shared/Checkbox";
import {
  EditableCheckboxCellContainer,
  ReferenceValue,
  ValueContainer,
} from "./editable-checkbox-cell.styles";

type EditableCheckboxCellProps = {
  value: boolean;
  refValue: boolean | null;
  onUpdate: (value: string) => void;
  isEditable?: boolean;
};

export default function EditableCheckboxCell({
  value,
  refValue,
  onUpdate,
}: EditableCheckboxCellProps) {
  const { showReference, isEditing } = useAppSelector(
    (state) => state.jobRecipe
  );

  const handleUpdate = () => {
    isEditing && onUpdate(String(!value));
  };

  return (
    <EditableCheckboxCellContainer>
      <ValueContainer isEditing={isEditing}>
        <CheckboxComponent
          checked={value}
          onToggle={handleUpdate}
          isDisabled={!isEditing}
        />
      </ValueContainer>
      {showReference && (
        <ReferenceValue>
          {refValue !== null && (
            <CheckboxComponent checked={refValue} isDisabled={true} />
          )}
        </ReferenceValue>
      )}
    </EditableCheckboxCellContainer>
  );
}
