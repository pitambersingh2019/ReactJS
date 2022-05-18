import styled, { css } from "styled-components";
import { IDataPositionSelect, IMediaSelect } from ".";

type TSizeBreakpoint = "sm" | "md" | "lg" | "xl";

const getMediaDataHeightWrapperComponent = (
  size: TSizeBreakpoint,
  breakpoint?: IMediaSelect
) => {
  if (!breakpoint) return "";
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width + "px"};
    `;
  return "";
};

interface IHeightWrapper {
  width: number;
  breakpoint?: IMediaSelect;
}

export const HeightWrapper = styled.div<IHeightWrapper>`
  height: 40px;
  width: ${({ width }) => width + "px"};
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataHeightWrapperComponent("xl", breakpoint)}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataHeightWrapperComponent("lg", breakpoint)}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataHeightWrapperComponent("md", breakpoint)}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataHeightWrapperComponent("sm", breakpoint)}
  }
`;

export const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
`;

const getMediaDataWrapperComponent = (
  size: TSizeBreakpoint,
  breakpoint?: IMediaSelect
) => {
  if (!breakpoint) return "";
  const value = breakpoint[size];
  if (value)
    return css`
      width: ${value.width + "px"};
    `;
  return "";
};

interface IWrapper {
  isOpen: boolean;
  isFits: boolean;
  width: number;
  position: IDataPositionSelect;
  breakpoint?: IMediaSelect;
}

export const Wrapper = styled.div<IWrapper>`
  width: ${({ width }) => width + "px"};
  display: flex;
  flex-direction: ${({ isFits }) => (isFits ? "column" : "column-reverse")};
  transform: ${({ isFits }) =>
    isFits ? "unset" : "translateY(calc(-100% + 40px))"};
  position: ${({ isOpen }) => (isOpen ? "fixed" : "relative")};
  top: ${({ isOpen, position }) => (isOpen ? position.y + "px" : "unset")};
  left: ${({ isOpen, position }) => (isOpen ? position.x + "px" : "unset")};
  z-index: ${({ isOpen }) => (isOpen ? 777 : 1)};
  border: 1px solid #404d61;
  border-radius: 4px;
  background-color: white;
  @media (max-width: 1400px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent("xl", breakpoint)}
  }
  @media (max-width: 1200px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent("lg", breakpoint)}
  }
  @media (max-width: 1024px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent("md", breakpoint)}
  }
  @media (max-width: 640px) {
    ${({ breakpoint }) => getMediaDataWrapperComponent("sm", breakpoint)}
  }
  &:hover {
    border-color: ${({ isOpen }) => (isOpen ? "#404d61" : "#5900d3")};
  }
`;

interface IWrapperScroll {
  isFits: boolean;
}

export const WrapperScroll = styled.div<IWrapperScroll>`
  max-height: 200px;
  overflow-y: auto;

  & > div:hover {
    background-color: #f4f2ff;
  }
  & > div:active {
    background-color: #5900d3;
    color: white;
  }
  & > div {
    border-bottom: 1px solid rgba(197, 201, 207, 0.3);
  }
  & > div:last-child {
    border-bottom: unset;
    border-radius: ${({ isFits }) => (isFits ? "0 0 4px 4px" : "unset")};
  }
  & > div:first-child {
    border-radius: ${({ isFits }) => (isFits ? "unset" : "4px 4px 0 0")};
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

interface ISettingWrapper {
  isFits: boolean;
  isSetting: boolean;
}

export const SettingWrapper = styled.div<ISettingWrapper>`
  display: flex;
  flex-direction: ${({ isFits }) => (isFits ? "column" : "column-reverse")};
  border-bottom: ${({ isSetting, isFits }) =>
    isFits && isSetting ? "2px solid #c5c9cf" : "unset"};
  border-top: ${({ isSetting, isFits }) =>
    !isFits && isSetting ? "2px solid #c5c9cf" : "unset"};
`;
