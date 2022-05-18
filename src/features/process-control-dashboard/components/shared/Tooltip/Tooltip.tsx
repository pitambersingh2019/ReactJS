import { Content, TooltipContainer } from "./styles";

type TooltipProps = {
  content: string;
};

export default function Tooltip({ content }: TooltipProps) {
  return (
    <TooltipContainer>
      <Content>{content}</Content>
    </TooltipContainer>
  );
}
