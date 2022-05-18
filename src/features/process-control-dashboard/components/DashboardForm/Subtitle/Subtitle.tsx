import { SubtitleContainer } from "./subtitle.styles";

type SubtitleProps = {
  text: string;
};

export default function Subtitle({ text }: SubtitleProps) {
  return <SubtitleContainer>{text}</SubtitleContainer>;
}
