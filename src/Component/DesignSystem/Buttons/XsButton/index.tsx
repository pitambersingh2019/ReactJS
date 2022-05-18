import { Label, XsButtonContainer } from "./styles";

type XsButtonProps = React.HTMLProps<HTMLButtonElement> & {
  label: string;
  onButtonClick: () => void;
  disabled?: boolean;
};

export default function XsButton({
  label,
  onButtonClick,
  disabled,
}: XsButtonProps) {
  return (
    <XsButtonContainer onClick={onButtonClick} disabled={disabled}>
      <Label>{label}</Label>
    </XsButtonContainer>
  );
}
