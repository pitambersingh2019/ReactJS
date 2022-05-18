import {
  Checkbox,
  Label,
  ShiftNameCheckboxContainer,
} from "./shift-name-checkbox.styles";
import checkboxDefault from "../../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../../assets/icons/checkbox-checked.svg";
import checkboxHalf from "../../../../../../assets/icons/checkbox-half.svg";
import { Checked } from "../../../../ts";

type ShiftNameCheckboxProps = {
  name: string;
  isChecked: Checked;
  onToggle: () => void;
};

export default function ShiftNameCheckbox({
  name,
  isChecked,
  onToggle,
}: ShiftNameCheckboxProps) {
  const checkboxValue = () => {
    if (isChecked === Checked.All) {
      return checkboxChecked;
    }
    if (isChecked === Checked.Half) {
      return checkboxHalf;
    }
    return checkboxDefault;
  };

  const checkboxIcon = checkboxValue();

  return (
    <ShiftNameCheckboxContainer>
      <Checkbox src={checkboxIcon} alt="checkbox icon" onClick={onToggle} />
      <Label>{name}</Label>
    </ShiftNameCheckboxContainer>
  );
}
