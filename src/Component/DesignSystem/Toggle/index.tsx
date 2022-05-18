import { CheckBox, CheckBoxLabel, Container } from "./styles";

type ToggleProps = {
  isOn: boolean;
  onToggleOnOff: () => void;
  variant?: "primary" | "purple";
};

export default function Toggle({
  isOn,
  onToggleOnOff,
  variant = "primary",
}: ToggleProps) {
  return (
    <Container>
      <CheckBox
        id="checkbox"
        type="checkbox"
        checked={isOn}
        onChange={onToggleOnOff}
        variant={variant}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </Container>
  );
}
