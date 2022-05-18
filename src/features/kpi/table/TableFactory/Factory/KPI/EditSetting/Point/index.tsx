import { FC } from "react";
import * as Styled from "./style";

interface IProps {
  text: string;
  img: string;
  imgWhite: string;
  isPrimary: boolean;
  onClick: () => void;
}

const PointEditSetting: FC<IProps> = ({
  img,
  imgWhite,
  text,
  onClick,
  isPrimary,
}) => {
  return (
    <Styled.Wrapper
      onClick={onClick}
      disable={isPrimary && text === "Make Primary"}
    >
      <Styled.WrapperImg text={text}>
        <img src={img} alt="" />
        <img src={imgWhite} alt="" />
      </Styled.WrapperImg>
      <Styled.PointText>{text}</Styled.PointText>
    </Styled.Wrapper>
  );
};

export default PointEditSetting;
