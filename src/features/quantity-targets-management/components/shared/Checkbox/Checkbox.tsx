import checkbox from "../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked.svg";
import { Checkbox, CheckboxContainer, Label } from "./styles";

type CheckboxComponentProps = {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
};

export default function CheckboxComponent({
  isChecked,
  onToggle,
  label,
}: CheckboxComponentProps) {
  return (
    <CheckboxContainer>
      <Checkbox
        src={isChecked ? checkboxChecked : checkbox}
        alt="checkbox icon"
        onClick={onToggle}
      />
      <Label>{label}</Label>
    </CheckboxContainer>
  );
}
