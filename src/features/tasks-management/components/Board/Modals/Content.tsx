import { StyledContent } from "./modal.styles";

type ContentProps = {
  text: string;
};

export default function Content({ text }: ContentProps) {
  return <StyledContent>{text}</StyledContent>;
}
