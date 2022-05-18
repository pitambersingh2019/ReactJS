import { FC } from "react";
import * as Styled from "./styles";
import arrowImg from "./../../../../../../assets/img/Arow_dropdown.svg";
import arrowWhiteImg from "./../../../../../../assets/img/Arow_dropdown_White.svg";

interface IProps {
  text: string;
  isArrow: boolean;
  img: string;
  imgWhite: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CreateSettingPoint: FC<IProps> = ({
  text,
  isArrow,
  img,
  imgWhite,
  onClick,
}) => {
  return (
    <Styled.Wrapper onClick={onClick}>
      <Styled.WrapperSettingButton>
        <Styled.WrapperSettingButtonText>
          <img src={img} alt="" />
          <img src={imgWhite} alt="" />
          <div>{text}</div>
        </Styled.WrapperSettingButtonText>
        {isArrow && (
          <Styled.WrapperArrowImg>
            <img src={arrowImg} alt="" />
            <img src={arrowWhiteImg} alt="" />
          </Styled.WrapperArrowImg>
        )}
      </Styled.WrapperSettingButton>
    </Styled.Wrapper>
  );
};

export default CreateSettingPoint;
