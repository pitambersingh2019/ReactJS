import { Position, StyledTooltip, Text } from "./styles";

type TooltipProps = {
  text: string;
  position?: Position;
  minWidth?: string;
};

export default function Tooltip({
  text,
  position = "RIGHT",
  minWidth,
}: TooltipProps) {
  return (
    <StyledTooltip position={position}>
      <Text minWidth={minWidth}>{text}</Text>
    </StyledTooltip>
  );
}
