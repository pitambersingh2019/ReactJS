import * as Styled from "./style";
import cancelImg from "./../../../../assets/icons/Calculator_multiplication.svg";
import { FC } from "react";

interface IProps {
  onClose: () => void;
  title: string;
  img?: string;
}

const HeaderSettingModal: FC<IProps> = ({ onClose, title, img }) => {
  return (
    <Styled.HeaderWrapper>
      <Styled.HeaderTextWrapper>
        {img && (
          <Styled.HeaderTextImgWrapper>
            <img src={img} />
          </Styled.HeaderTextImgWrapper>
        )}

        <Styled.HeaderText>{title}</Styled.HeaderText>
      </Styled.HeaderTextWrapper>
      <Styled.CancelWrapper onClick={onClose}>
        <img src={cancelImg} />
      </Styled.CancelWrapper>
    </Styled.HeaderWrapper>
  );
};

export default HeaderSettingModal;
