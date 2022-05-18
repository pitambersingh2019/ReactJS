import { FC } from "react";
import * as Styled from "./style";
import arrowWhite from "./../../../assets/icons/selectWhite.svg";

interface IProps {
  isActive: boolean;
  color: string;
  type: "radio" | "checkbox";
  onClick: () => void;
  text?: string;
  isHalf?: boolean;
}

const InputDefault: FC<IProps> = ({
  isActive,
  text,
  color,
  onClick,
  type,
  isHalf = false,
}) => {
  return (
    <Styled.Wrapper>
      {type === "radio" && (
        <Styled.Curcle isActive={isActive} color={color} onClick={onClick} />
      )}
      {type === "checkbox" && (
        <Styled.CheckBox
          isActive={isActive}
          isHalf={isHalf}
          color={color}
          onClick={onClick}
        >
          {!isHalf && isActive && <img src={arrowWhite} />}
          {isHalf && !isActive && <Styled.CheckBoxLine color={color} />}
        </Styled.CheckBox>
      )}
      {text && <Styled.Text>{text}</Styled.Text>}
    </Styled.Wrapper>
  );
};

export default InputDefault;
