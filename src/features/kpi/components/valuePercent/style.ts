import styled, { css } from "styled-components";
import { ISizeValuePersent, TPostionText } from ".";
import { Breakpoints } from "../gauge";

type TBreakpointGuage = Breakpoints<ISizeValuePersent>;

interface IBraekpointSize {
  breakpoint: TBreakpointGuage;
}

type TSizeBreakpoint = "sm" | "md" | "lg" | "xl";
interface IWrapper extends IBraekpointSize {
  width: number;
}

const getMediaDataWrapper = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width + "px"};
    `;
  return "";
};

export const Wrapper = styled.div<IWrapper>`
  width: ${(props) => props.width + "px"};
  position: relative;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataWrapper(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataWrapper(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataWrapper(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataWrapper(breakpoint, "sm")}
  }
`;

interface IPersentWrapper {
  positionText: TPostionText;
}

export const PersentWrapper = styled.div<IPersentWrapper>`
  display: flex;
  align-items: ${(props) =>
    props.positionText === "center" ? "center" : "flex-end"};
  width: 100%;
  height: 100%;
`;

interface IPercent extends IBraekpointSize {
  fontSize: number;
  isLong: boolean;
  positionText: TPostionText;
  isResultValid: boolean;
  colorText?: string;
}

const getMediaDataPercent = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      font-size: ${value.width + "px"};
    `;
  return "";
};

const getBigSize = (fontSize: number) => Math.ceil(fontSize * 1.6);
const getJustifyContent = (positionText: TPostionText) => {
  if (positionText === "right") return "end";
  if (positionText === "bottom-left") return "start";
  return "center";
};

export const Percent = styled.div<IPercent>`
  display: flex;
  justify-content: ${({ positionText }) => getJustifyContent(positionText)};
  font-size: ${({ fontSize, isResultValid }) =>
    isResultValid ? fontSize + "px" : getBigSize(fontSize) + "px"};
  align-items: flex-end;
  color: #797e89;
  font-weight: 600;
  width: 100%;
  & span {
    max-width: ${({ isLong }) => (isLong ? "100%" : "50%")};
    line-height: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  & span:first-of-type {
    color: ${({ colorText }) => (colorText ? colorText : "#730f1d")};
    font-size: ${({ fontSize }) => getBigSize(fontSize) + "px"};
    margin-bottom: ${({ fontSize, isResultValid }) =>
      isResultValid ? getBigSize(fontSize) / -9 + "px" : 0};
  }

  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataPercent(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataPercent(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataPercent(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataPercent(breakpoint, "sm")}
  }
`;
