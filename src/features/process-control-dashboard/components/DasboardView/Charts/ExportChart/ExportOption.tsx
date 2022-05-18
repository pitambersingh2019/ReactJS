import {
  ExportOptionContainer,
  OptionIcon,
  OptionLabel,
} from "./export-chart.styles";

type ExportOptionProps = {
  label: string;
  icon: string;
  onClick: () => void;
};

export default function ExportOption({
  label,
  icon,
  onClick,
}: ExportOptionProps) {
  return (
    <ExportOptionContainer onClick={onClick}>
      <OptionIcon src={icon} alt="export options icon" />
      <OptionLabel>{label}</OptionLabel>
    </ExportOptionContainer>
  );
}
