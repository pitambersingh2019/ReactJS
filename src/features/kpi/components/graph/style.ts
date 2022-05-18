import styled, { css } from "styled-components";
import { ISizeGraph } from ".";
import { Breakpoints } from "../gauge";
import { TSizeBreakpoint } from "../gauge/style";

type TBreakpointGraph = Breakpoints<ISizeGraph>;

interface IBraekpointSize {
  breakpoint: TBreakpointGraph;
}

interface IWrapperComponent {
  isPrimary: boolean;
}

export const WrapperComponent = styled.div<IWrapperComponent>`
  display: flex;
  flex-direction: ${({ isPrimary }) => (isPrimary ? "row-reverse" : "column")};
  align-items: flex-end;
`;

interface IWrapper extends IBraekpointSize {
  width: number;
}

const getMediaDataWrapper = (
  breakpoint: TBreakpointGraph,
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
  width: ${({ width }) => width + "px"};
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

export const LineWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

interface ILineBackground extends IBraekpointSize {
  width: number;
  height: number;
  isResultValid: boolean;
}

const getMediaDataLineBackground = (
  breakpoint: TBreakpointGraph,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width + "px"};
      height: ${value.width * 0.06 + "px"};
    `;
  return "";
};

export const LineBackground = styled.div<ILineBackground>`
  position: relative;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background-color: ${({ isResultValid }) =>
    isResultValid ? "#c7c7c7" : "#797e89"};
  border-radius: 10px;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataLineBackground(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataLineBackground(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataLineBackground(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataLineBackground(breakpoint, "sm")}
  }
`;

interface ILine extends IBraekpointSize {
  width: number;
  height: number;
  backgroundColor: string;
  widthColor: number;
}

const getMediaDataLine = (
  breakpoint: TBreakpointGraph,
  size: TSizeBreakpoint,
  widthColor: number
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${widthColor * value.width + "px"};
      height: ${value.width * 0.06 + "px"};
    `;
  return "";
};

export const Line = styled.div<ILine>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px 0 0 10px;
  @media (max-width: 1400px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataLine(breakpoint, "xl", widthColor)}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataLine(breakpoint, "lg", widthColor)}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataLine(breakpoint, "md", widthColor)}
  }
  @media (max-width: 640px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataLine(breakpoint, "sm", widthColor)}
  }
`;

interface IVerticalLine extends IBraekpointSize {
  height: number;
  left: number;
  widthColor: number;
}

const getMediaDataVerticalLine = (
  breakpoint: TBreakpointGraph,
  size: TSizeBreakpoint,
  widthColor: number
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      height: ${value.width * 0.12 + "px"};
      left: ${widthColor * value.width + "px"};
    `;
  return "";
};

export const VerticalLine = styled.div<IVerticalLine>`
  width: 3px;
  position: absolute;
  top: 0;
  left: ${({ left }) => (left === 0 ? left + "px" : left - 3 + "px")};
  border-radius: 2px;
  transform: translateY(-25%);
  background-color: black;
  height: ${({ height }) => height + "px"};
  @media (max-width: 1400px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataVerticalLine(breakpoint, "xl", widthColor)}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataVerticalLine(breakpoint, "lg", widthColor)}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataVerticalLine(breakpoint, "md", widthColor)}
  }
  @media (max-width: 640px) {
    ${({ breakpoint, widthColor }) =>
      getMediaDataVerticalLine(breakpoint, "sm", widthColor)}
  }
`;

export const LineNumberWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

interface ILineNumber extends IBraekpointSize {
  fontSize: number;
  isResultValid: boolean;
  translateX: number;
}

const getMediaDataLineNumber = (
  breakpoint: TBreakpointGraph,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      font-size: ${value.fontSize + "px"};
    `;
  return "";
};

export const LineNumber = styled.div<ILineNumber>`
  white-space: nowrap;
  color: ${({ isResultValid }) => (isResultValid ? "#b6b6b6" : "#797e89")};
  font-size: ${(props) => props.fontSize + "px"};
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataLineNumber(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataLineNumber(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataLineNumber(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataLineNumber(breakpoint, "sm")}
  }
`;

interface IWrapperPercent extends IBraekpointSize {
  gap: number;
  sideMargin?: number;
}

const getMediaDataWrapperPercent = (
  breakpoint: TBreakpointGraph,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      margin-bottom: ${value.gap + "px"};
    `;
  return "";
};

// @ts-ignore
export const WrapperPercent = styled.div<IWrapperPercent>`
  min-height: 30px;
  &:dir(rtl) {
    margin-right: ${({ gap, sideMargin }) =>
      sideMargin ? sideMargin + "px" : gap + "px"};
  }
  &:dir(ltr) {
    margin-left: ${({ gap, sideMargin }) =>
      sideMargin ? sideMargin + "px" : gap + "px"};
  }
  margin-bottom: ${({ gap }) => gap + "px"};
  display: flex;
  justify-content: end;
  align-items: flex-start;
  font-family: ProximaNova, sans-serif;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataWrapperPercent(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataWrapperPercent(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataWrapperPercent(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataWrapperPercent(breakpoint, "sm")}
  }
`;
