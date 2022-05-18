import styled from "styled-components";
import { ButtonCSize, IButtonCColor } from ".";

interface IWrapper {
  size: ButtonCSize;
  buttonType: "primary" | "secondary";
  dataColor: IButtonCColor;
  isAble: boolean;
  fullWidth: boolean;
}

const getBG = (
  isAble: boolean,
  buttonType: "primary" | "secondary",
  dataColor: IButtonCColor,
  isHover: boolean
) => {
  if (buttonType === "secondary") return "unset";
  if (isHover && isAble) dataColor.hover;
  if (isAble) return dataColor.default;
  return dataColor.disable;
};

const getColor = (
  isAble: boolean,
  buttonType: "primary" | "secondary",
  dataColor: IButtonCColor,
  isHover: boolean
) => {
  if (buttonType === "primary") return "white";
  if (isHover && isAble) dataColor.hover;
  if (isAble) return dataColor.default;
  return dataColor.disable;
};

const getBorderColor = (
  isAble: boolean,
  dataColor: IButtonCColor,
  isHover: boolean
) => {
  if (isHover && isAble) dataColor.hover;
  if (isAble) return dataColor.default;
  return dataColor.disable;
};

const dataHeight = {
  s: "16px",
  m: "32px",
  l: "40px",
};

const dataWidth = {
  s: "100px",
  m: "100px",
  l: "120px",
};

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 8px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  min-width: ${({ size }) => dataWidth[size]};
  height: ${({ size }) => dataHeight[size]};
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ isAble, dataColor }) =>
    getBorderColor(isAble, dataColor, false)};
  background-color: ${({ isAble, buttonType, dataColor }) =>
    getBG(isAble, buttonType, dataColor, false)};
  cursor: ${({ isAble }) => (isAble ? "pointer" : "initial")};

  & > div {
    color: ${({ isAble, buttonType, dataColor }) =>
      getColor(isAble, buttonType, dataColor, false)};
  }

  &:hover {
    background-color: ${({ isAble, buttonType, dataColor }) =>
      getBG(isAble, buttonType, dataColor, true)};
    border-color: ${({ isAble, dataColor }) =>
      getBorderColor(isAble, dataColor, true)};
    & > div {
      color: ${({ isAble, buttonType, dataColor }) =>
        getColor(isAble, buttonType, dataColor, true)};
    }
  }
`;

export const Text = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

interface IImgWrapper {
  size: ButtonCSize;
}

const dataHeightImg = {
  s: "10px",
  m: "16px",
  l: "20px",
};

export const ImgWrapper = styled.div<IImgWrapper>`
  height: ${({ size }) => dataHeightImg[size]};
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    height: 100%;
    width: auto;
  }
`;
