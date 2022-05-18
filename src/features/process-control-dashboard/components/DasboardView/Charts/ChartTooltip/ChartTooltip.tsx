import {
  ChartTooltipContainer,
  ParamName,
  Date,
  Value,
} from "./chart-tooltip.styles";

type ChartTooltipProps = {
  paramName: string;
  color: string | Highcharts.GradientColorObject | Highcharts.PatternObject;
  date: string;
  value: string | number;
};

export default function ChartTooltip({
  paramName,
  color,
  date,
  value,
}: ChartTooltipProps) {
  return (
    <ChartTooltipContainer color={color.toString()}>
      <ParamName color={color.toString()}>{paramName}</ParamName>
      <Date>{date}</Date>
      <Value>{value}</Value>
    </ChartTooltipContainer>
  );
}
