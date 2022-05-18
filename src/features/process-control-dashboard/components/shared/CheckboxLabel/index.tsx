import checkbox from "../../../../../assets/icons/tasks-management/checkbox_default.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked-purple.svg";
import { Container, Checkbox, Label } from "./styles";

type CheckboxLabelProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export default function CheckboxLabel({
  label,
  checked,
  onToggle,
}: CheckboxLabelProps) {
  return (
    <Container>
      <Checkbox
        src={checked ? checkboxChecked : checkbox}
        alt="checkbox"
        onClick={onToggle}
      />
      <Label>{label}</Label>
    </Container>
  );
}
