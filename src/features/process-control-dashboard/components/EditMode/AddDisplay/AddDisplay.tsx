import plusIcon from "../../../../../assets/icons/plus-purple.svg";
import { AddDisplayContainer, Label, PlusIcon } from "./add-display.styles";

type AddDisplayProps = {
  onAddDisplay: () => void;
  label: string;
  withPadding?: boolean;
};

export default function AddDisplay({
  onAddDisplay,
  label,
  withPadding = false,
}: AddDisplayProps) {
  return (
    <AddDisplayContainer onClick={onAddDisplay} withPadding={withPadding}>
      <PlusIcon src={plusIcon} alt="plus icon" />
      <Label>{label}</Label>
    </AddDisplayContainer>
  );
}
