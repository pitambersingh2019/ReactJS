import checkbox from "../../../../../assets/icons/tasks-management/checkbox_default.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked-purple.svg";
import { Container, Checkbox, Label } from "./styles";

type CheckboxLabelProps = {
  label?: string;
  checked: boolean;
  onToggle?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isDisabled?: boolean;
};

export default function CheckboxComponent({
  label,
  checked,
  onToggle,
  isDisabled = false,
}: CheckboxLabelProps) {
  return (
    <Container>
      <Checkbox
        src={checked ? checkboxChecked : checkbox}
        alt="checkbox"
        onClick={onToggle}
        isDisabled={isDisabled}
      />
      {label && <Label>{label}</Label>}
    </Container>
  );
}
