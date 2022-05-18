import { ChipContainer } from "./chip.styles";

type ChipProps = {
  label: string;
  count?: number;
};

export default function Chip({ label, count }: ChipProps) {
  const content = count && count > 0 ? `${label}: ${count}` : label;
  return <ChipContainer>{content}</ChipContainer>;
}
