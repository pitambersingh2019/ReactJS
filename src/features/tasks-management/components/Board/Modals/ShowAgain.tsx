import { useState } from "react";
import checkbox from "../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../assets/icons/checkbox-checked.svg";
import { StyledShowAgain } from "./modal.styles";

type ShowAgainProps = {
  text: string;
};

export default function ShowAgain({ text }: ShowAgainProps) {
  const [checked, toggleChecked] = useState(false);

  const handleClick = () => {
    toggleChecked((prev) => !prev);
  };

  return (
    <StyledShowAgain>
      <img
        src={checked ? checkboxChecked : checkbox}
        onClick={handleClick}
        alt="checkbox"
      />
      <span>{text}</span>
    </StyledShowAgain>
  );
}
