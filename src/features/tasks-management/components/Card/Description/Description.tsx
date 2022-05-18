import { StyledDescription } from "./description.styles";

type DescriptionProps = {
  description: string;
};

export default function Description({ description }: DescriptionProps) {
  return <StyledDescription>{description}</StyledDescription>;
}
