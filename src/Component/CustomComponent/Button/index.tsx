import { FC } from "react";
import * as Styled from "./style";

export type ButtonCSize = "s" | "m" | "l";
export interface IButtonCColor {
  default: string;
  hover: string;
  disable: string;
}

interface IProps {
  size: ButtonCSize;
  buttonType: "primary" | "secondary";
  isAble: boolean;
  text: string;
  img?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  color?: IButtonCColor;
}

const defaultColor: IButtonCColor = {
  default: "#5900d3",
  hover: "#36009d",
  disable: "#ad9ebe",
};

const ButtonComponent: FC<IProps> = ({
  size,
  text,
  isAble,
  color = defaultColor,
  buttonType,
  img,
  fullWidth = false,
  onClick,
}) => {
  const onClickButton = () => {
    if (!isAble || !onClick) return;
    onClick();
  };

  return (
    <Styled.Wrapper
      size={size}
      isAble={isAble}
      dataColor={color}
      buttonType={buttonType}
      fullWidth={fullWidth}
      onClick={onClickButton}
    >
      {img && (
        <Styled.ImgWrapper size={size}>
          <img src={img} />
        </Styled.ImgWrapper>
      )}
      <Styled.Text>{text}</Styled.Text>
    </Styled.Wrapper>
  );
};

export default ButtonComponent;
