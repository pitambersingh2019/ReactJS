import { FC } from "react";
import * as Styled from "./style";

interface IProps {
  checked: boolean;
  onChange?: () => void;
}

const MySwitch: FC<IProps> = ({ checked, onChange }) => {
  return (
    <Styled.Wrapper isActive={checked} onClick={onChange}>
      <Styled.Circle isActive={checked} />
    </Styled.Wrapper>
  );
};

export default MySwitch;
