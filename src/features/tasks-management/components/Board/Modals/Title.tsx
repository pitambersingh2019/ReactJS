import { StyledTitle } from "./modal.styles";
import icon from "../../../../../assets/icons/tasks-management/warning.svg";

type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return (
    <StyledTitle>
      <img src={icon} alt="warning icon" />
      <span>{text}</span>
    </StyledTitle>
  );
}
