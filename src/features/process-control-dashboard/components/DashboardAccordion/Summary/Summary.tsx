import {
  SummaryContainer,
  SummarySubtitle,
  SummaryTitle,
} from "./summary.styles";

type SummaryProps = {
  title: string;
  subtitle: string;
};

export default function Summary({ title, subtitle }: SummaryProps) {
  return (
    <SummaryContainer>
      <SummaryTitle>{title}</SummaryTitle>
      <SummarySubtitle>{subtitle}</SummarySubtitle>
    </SummaryContainer>
  );
}
