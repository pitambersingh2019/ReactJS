import { FC } from "react";
import * as Styled from "./style";
import warningImg from "../../../../assets/icons/warning.svg";

interface IProps {
  onClick: () => void;
  text: string;
  colorText: string;
  img: string;
  warning?: string;
  isBorder?: boolean;
  isFits?: boolean;
}

const ItemSelect: FC<IProps> = ({
  onClick,
  text,
  colorText,
  isBorder,
  isFits,
  img,
  warning,
}) => {
  return (
    <Styled.Wrapper
      onClick={onClick}
      isBorder={!!isBorder}
      isFits={!!isFits}
      color={colorText}
    >
      <Styled.Text>{text}</Styled.Text>
      <Styled.WarningWrapper>
        {warning && (
          <>
            <img src={warningImg} />
            <Styled.WarningTooltip>{warning}</Styled.WarningTooltip>
          </>
        )}
      </Styled.WarningWrapper>
      <Styled.ImgWrapper>{img !== "" && <img src={img} />}</Styled.ImgWrapper>
    </Styled.Wrapper>
  );
};

export default ItemSelect;
