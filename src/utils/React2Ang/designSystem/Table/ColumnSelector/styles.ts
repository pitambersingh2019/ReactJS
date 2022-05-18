import styled, { keyframes } from "styled-components";
import SideMenuIcon from "../SVG/SideMenuIcon";
import ShareIcon from "../SVG/SearchIcon2";
import RestoreIcon from "../SVG/RestoreIcon2";
// @ts-ignore
import rtl from "styled-components-rtl";

export enum POSITION {
  LEFT_BITTOM = "left_bottom",
  RIGHT_BOTTOM = "right_bottom",
}

const animationShowSelector = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const ColumnSelectorStyled = styled.div<{
  position: POSITION;
  shift: number;
}>`
  ${rtl`
        padding: 16px 4px 12px 8px;
  `}

  width: 260px;
  height: 400px;

  ${(props) =>
    props.position === POSITION.LEFT_BITTOM &&
    `
      left: 100%;
      top: 0;
  `}

  ${(props) =>
    props.position === POSITION.RIGHT_BOTTOM &&
    `
      left: auto;
      right: 100%;
      top: 0;
  `}

  ${(props) =>
    (props.position === POSITION.RIGHT_BOTTOM ||
      props.position === POSITION.LEFT_BITTOM) &&
    `
      transform: translateY(${-props.shift}px);
    `}
    
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  background-color: #ffff;
  animation: ${animationShowSelector} 0.2s linear;
  display: flex;
  flex-direction: column;
`;

export const HeaderSelector = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${rtl`
        padding: 16px 16px 0 16px;
  `}
`;
export const SearchColWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px;
`;

export const ColsSelectorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-top: 8px;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    margin: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ItemWrapper = styled.div`
  width: 100%;
  height: 38px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid #ecf1f7;
  gap: 5px;
  user-select: none;
  cursor: pointer;
`;
export const DividerStyled = styled.div`
  width: 100%;
  height: 1px;
  margin: 1px;
  background-color: #ecf1f7;
`;
export const TitleStyled = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
  `}

  color: #000;
`;

export const ContentTextStyled = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
  `}
  color: #707070;
`;

export const SideLeftPanelTable = styled.div`
  width: 60px;
  position: relative;
  height: 100%;
  background-color: #ecf1f7;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 10px;
`;

export const StyledIconMenu = styled(SideMenuIcon)<{ open: boolean }>`
  width: 19px;
  height: 19px;
  transform: rotate(90deg);
  fill: ${(p) => (p.open ? "#5900d3" : "#4a4a4a")};
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;

export const CheckBoxStyled = styled.input`
  width: 16px;
  height: 16px;
`;

export const DragDot = styled.div`
  height: 3px;
  width: 3px;
  background-color: #afafaf;
  border-radius: 100%;
  display: inline-block;
`;

export const DragDotsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  gap: 2px;
`;
export const DragDotsWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
`;

const rotateanimation = keyframes`
  from {
    transform: rotate(0deg) scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const DraggedRowItem = styled.div<{ show: boolean }>`
  visibility: ${(p) => (p.show ? "visible" : "hidden")};
  display: ${(p) => (p.show ? "block" : "none")};
  position: fixed;
  opacity: 1;
  width: 100%;
  top: 999999px;
  width: 240px;
  z-index: ${(p) => (p.show ? 2 : -1)};
  transform: rotate(-7deg);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  animation: ${rotateanimation} 0.3s linear;
`;

export const DividerFooter = styled.div`
  background-color: #ecf1f7;
  width: 100%;
  height: 1px;
`;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
`;
export const ShareIconItemStyled = styled(ShareIcon)`
  width: 18px;
  height: 18px;
  .ShareIconReact2 {
    fill: #050709;
  }
`;

export const RestoreIconItemStyled = styled(RestoreIcon)`
  width: 18px;
  height: 18px;
  .RestoreIconReact2 {
    fill: #050709;
  }
`;

export const FooterItemText = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
`;
