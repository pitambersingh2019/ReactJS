import {
  Checkbox,
  OptionItemContainer,
  OptionItemLabel,
} from "./section-option-item.styles";
import checkboxDefault from "../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked-purple.svg";
import checkboxHalf from "../../../../../assets/icons/checkbox-half-purple.svg";
import { Checked } from "../../../ts";

export type TopOption = {
  name: string;
  isChecked: Checked;
};

type SectionOptionItemProps = {
  optionItem: TopOption;
  onToggleCheckbox: () => void;
};

export default function SectionOptionItem({
  optionItem,
  onToggleCheckbox,
}: SectionOptionItemProps) {
  const { name, isChecked } = optionItem;

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

  const handleClick = () => {
    onToggleCheckbox();
  };

  return (
    <OptionItemContainer>
      <Checkbox src={checkboxIcon} alt="checkbox icon" onClick={handleClick} />
      <OptionItemLabel>{name}</OptionItemLabel>
    </OptionItemContainer>
  );
}
