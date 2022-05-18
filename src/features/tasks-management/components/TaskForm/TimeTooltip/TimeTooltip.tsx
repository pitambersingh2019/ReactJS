import { TimeTooltipContainer } from "./time-tooltip.styles";

type TimeTooltipProps = {
  date: string;
  isHeader?: boolean;
};

export default function TimeTooltip({ date, isHeader }: TimeTooltipProps) {
  return (
    <TimeTooltipContainer isHeader={isHeader}>{date}</TimeTooltipContainer>
  );
}
