import styled, { css } from "styled-components";
import { Breakpoints, ISizeGuage } from ".";

type TBreakpointGuage = Breakpoints<ISizeGuage>;

interface IBraekpointSize {
  breakpoint: TBreakpointGuage;
}

export type TSizeBreakpoint = "sm" | "md" | "lg" | "xl";

interface IWrapper {
  isPrimary: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  &:dir(rtl) {
    align-items: flex-start;
  }
  &:dir(ltr) {
    align-items: ${({ isPrimary }) => (isPrimary ? "flex-start" : "flex-end")};
  }
  flex-direction: ${({ isPrimary }) => (isPrimary ? "row" : "column-reverse")};
`;

interface IWrapperComponent extends IBraekpointSize {
  width: number;
  isPersent: boolean;
}

const getMediaDataWrapperComponent = (
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

export const WrapperComponent = styled.div<IWrapperComponent>`
  width: ${({ width }) => width + "px"};
  position: relative;
  &:dir(rtl) {
    margin: ${({ isPersent }) => (isPersent ? "0 0 auto 0" : "0 auto")};
  }
  &:dir(ltr) {
    margin: ${({ isPersent }) => (isPersent ? "0 auto 0 0" : "0 auto")};
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent(breakpoint, "sm")}
  }
`;

interface ICircleWrapper extends IBraekpointSize {
  height: number;
}

const getMediaDataCircleWrapper = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      height: ${value.width / 2 + "px"};
    `;
  return "";
};

export const CircleWrapper = styled.div<ICircleWrapper>`
  width: inherit;
  height: ${({ height }) => height + "px"};
  overflow: hidden;
  margin-bottom: 3px;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataCircleWrapper(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataCircleWrapper(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataCircleWrapper(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataCircleWrapper(breakpoint, "sm")}
  }
`;

interface ICircle extends IBraekpointSize {
  height: number;
  color: string;
}

const getMediaDataCircle = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      height: ${value.width + "px"};
    `;
  return "";
};

export const Circle = styled.div<ICircle>`
  width: inherit;
  height: ${({ height }) => height + "px"};
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataCircle(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataCircle(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataCircle(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataCircle(breakpoint, "sm")}
  }
`;

interface IWhiteCircle extends IBraekpointSize {
  width: number;
  height: number;
  backgrondColor?: string;
}

const getMediaDataWhiteCircle = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width - value.borderWidth + "px"};
      height: ${value.width - value.borderWidth + "px"};
    `;
  return "";
};

export const WhiteCircle = styled.div<IWhiteCircle>`
  width: ${(props) => props.width + "px"};
  height: ${({ height }) => height + "px"};
  background-color: ${(props) =>
    props.backgrondColor ? props.backgrondColor : "#fafafa"};
  border-radius: 50%;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataWhiteCircle(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataWhiteCircle(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataWhiteCircle(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataWhiteCircle(breakpoint, "sm")}
  }
`;

export const CircleNumberWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

interface ICircleNumber extends IBraekpointSize {
  fontSize: number;
  type: "min" | "max";
  isResultValid: boolean;
}

const getMediaDataCircleNumber = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      font-size: ${value.fontSize + "px"};
    `;
  return "";
};

export const CircleNumber = styled.div<ICircleNumber>`
  white-space: nowrap;
  color: ${({ isResultValid }) => (isResultValid ? "#797e8d" : "#797e89")};
  font-size: ${({ fontSize }) => fontSize + "px"};
  transform: ${(props) => (props.type === "max" ? "translateX(25%)" : "unset")};
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataCircleNumber(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataCircleNumber(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataCircleNumber(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataCircleNumber(breakpoint, "sm")}
  }
`;

interface IArrowWrapper extends IBraekpointSize {
  width: number;
  height: number;
  progress: number;
}

const getMediaDataArrowWrapper = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width * 0.3 + "px"};
      height: ${value.width * 0.15 + "px"};
    `;
  return "";
};

export const ArrowWrapper = styled.div<IArrowWrapper>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -50%;
  right: 50%;
  transform-origin: right center;
  transform: ${({ progress }) =>
    "rotate(" + progress * 1.8 + "deg) translateX(20%)"};

  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataArrowWrapper(breakpoint, "xl")}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataArrowWrapper(breakpoint, "lg")}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataArrowWrapper(breakpoint, "md")}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataArrowWrapper(breakpoint, "sm")}
  }
`;

export const Arrow = styled.img`
  width: 100%;
  height: auto;
`;

interface IWrapperPercent extends IBraekpointSize {
  color: string;
  fontSize: number;
}

const getMediaDataWrapperPercent = (
  breakpoint: TBreakpointGuage,
  size: TSizeBreakpoint
) => {
  const value = breakpoint[size];
  if (value)
    return css`
      font-size: ${value.fontSize * 2 + "px"};
    `;
  return "";
};

export const WrapperPercent = styled.div<IWrapperPercent>`
  height: 100%;
  display: flex;
  align-items: flex-start;
  font-family: ProximaNova, sans-serif;
  font-size: ${({ fontSize }) => fontSize * 2 + "px"};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.color};
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

export const ValueWrapper = styled.div`
  margin-bottom: 3px;
  width: 100%;
`;
