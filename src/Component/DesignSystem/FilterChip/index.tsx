import { ChipContainer, CloseIcon, Label } from "./styles";
import icon from "../../../assets/icons/tasks-management/close.svg";

type FilterChipProps = {
  label: string;
  count: number;
  onClose: () => void;
  onButtonClick: () => void;
};

export default function FilterChip({
  label,
  count,
  onClose,
  onButtonClick,
}: FilterChipProps) {
  return (
    <ChipContainer>
      <Label onClick={onButtonClick}>
        {label} {count > 1 ? `(${count})` : ""}
      </Label>
      <CloseIcon src={icon} alt="close icon" onClick={onClose} />
    </ChipContainer>
  );
}
