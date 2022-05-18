import {
  Checkbox,
  OptionItemContainer,
  OptionItemLabel,
} from "./section-option-item.styles";
import checkboxDefault from "../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked-purple.svg";
import checkboxHalf from "../../../../../assets/icons/checkbox-half-purple.svg";
import { Checked, TaskPriority } from "../../../ts";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

export type OptionItem = {
  name: keyof typeof TaskPriority | string;
  isChecked: boolean;
};

export type TopOption = {
  name: string;
  isChecked: Checked;
};

type SectionOptionItemProps = {
  optionItem: OptionItem | TopOption;
  onToggleCheckbox: (optionItem: OptionItem) => void;
};

export default function SectionOptionItem({
  optionItem,
  onToggleCheckbox,
}: SectionOptionItemProps) {
  const { name, isChecked } = optionItem;

  const { t } = useTranslation();

  const checkboxValue = () => {
    if (typeof isChecked === "boolean") {
      return isChecked ? checkboxChecked : checkboxDefault;
    }
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
    if (typeof isChecked === "boolean") {
      onToggleCheckbox({
        name: name as keyof typeof TaskPriority | string,
        isChecked: !isChecked,
      });
    }
  };

  const translatedOption =
    t(translations.TasksManagement[name.replace(" ", "")]) || name;

  return (
    <OptionItemContainer>
      <Checkbox src={checkboxIcon} alt="checkbox icon" onClick={handleClick} />
      <OptionItemLabel>{translatedOption}</OptionItemLabel>
    </OptionItemContainer>
  );
}
