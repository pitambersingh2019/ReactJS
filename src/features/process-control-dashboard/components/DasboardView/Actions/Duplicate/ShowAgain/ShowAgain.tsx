import { useState } from "react";
import checkbox from "../../../../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../../../../assets/icons/checkbox-checked.svg";
import { Checkbox, Content, ShowAgainContainer } from "./show-again.styles";

type ShowAgainProps = {
  text: string;
};

export default function ShowAgain({ text }: ShowAgainProps) {
  const [checked, toggleChecked] = useState(false);

  const handleClick = () => {
    toggleChecked((prev) => !prev);
  };

  return (
    <ShowAgainContainer>
      <Checkbox
        src={checked ? checkboxChecked : checkbox}
        onClick={handleClick}
        alt="checkbox"
      />
      <Content>{text}</Content>
    </ShowAgainContainer>
  );
}
