import { SummaryContainer } from "./summary.styles";

type SummaryProps = {
  title: string;
};

export default function Summary({ title }: SummaryProps) {
  return <SummaryContainer>{title}</SummaryContainer>;
}
