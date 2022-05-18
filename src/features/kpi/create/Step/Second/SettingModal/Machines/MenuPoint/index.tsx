import { FC } from "react";
import { TFilterMenu } from "../../../../../../api/types";
import * as Styled from "./style";

interface IProps {
  isActive: boolean;
  text: string;
  onClick: (value: TFilterMenu) => void;
  name: TFilterMenu;
}

const MenuPointModal: FC<IProps> = ({ isActive, text, onClick, name }) => {
  return (
    <Styled.Wrapper
      onClick={() => {
        onClick(name);
      }}
      isActive={isActive}
    >
      {text}
    </Styled.Wrapper>
  );
};

export default MenuPointModal;
