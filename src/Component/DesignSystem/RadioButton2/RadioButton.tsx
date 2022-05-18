import { RadioButtonContainer, Label, Radio } from "./radio-button.styles";

type RadioButtonProps = {
  label: string;
  isSelected: boolean;
  handleSelect: (optionLabel: string) => void;
};

export default function RadioButton({
  label,
  isSelected,
  handleSelect,
}: RadioButtonProps) {
  return (
    <RadioButtonContainer>
      <Radio
        type="radio"
        checked={isSelected}
        onChange={() => handleSelect && handleSelect(label)}
      />
      {label && <Label>{label}</Label>}
    </RadioButtonContainer>
  );
}
