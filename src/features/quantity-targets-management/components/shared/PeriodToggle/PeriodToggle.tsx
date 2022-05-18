import Toggle from "../../../../../Component/DesignSystem/Toggle";
import { Label, PeriodToggleContainer } from "./styles";

type PeriodToggleProps = {
  label: string;
  toggleIsOn: boolean;
  onToggle: () => void;
};

export default function PeriodToggle({
  label,
  toggleIsOn,
  onToggle,
}: PeriodToggleProps) {
  return (
    <PeriodToggleContainer>
      <Label>{label}</Label>
      <Toggle isOn={toggleIsOn} onToggleOnOff={onToggle} />
    </PeriodToggleContainer>
  );
}
