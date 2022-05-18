import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

interface IWrapper {
  isDragOver: boolean;
  isDrag: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  position: relative;
  width: 190px;
  height: 220px;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  cursor: ${({ isDrag }) => (isDrag ? "grabbing" : "grab")};
  box-shadow: ${({ isDragOver }) =>
    isDragOver
      ? "10px 0px 6px rgb(0, 0, 0, 0.3);"
      : " 0 0 6px rgb(0, 0, 0, 0.16);"};
  opacity: ${({ isDrag }) => (isDrag ? "0" : "1")};
  transition: transform 0.2s; /* Animation */

  &.ShowCard {
    transform: scale(1.2);
    z-index: 2;
  }
`;

export const KPISetting = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
`;

export const DisplayWrapper = styled.div`
  height: 70%;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const KPINameWrapper = styled.div`
  overflow: hidden;
  height: 10%;
`;

export const KPIFooter = styled.div`
  height: 10%;
  display: flex;
  justify-content: right;
`;

export const PopupWrapper = styled.div<{ opened: boolean }>`
  position: absolute;
  border-radius: 6px;
  width: 190px;
  height: 220px;
  top: 0;
  left: 0;
  z-index: 1;
  visibility: ${(props) => (props.opened ? "visible" : "hidden")};
  background-color: ${(props) =>
    props.opened ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,1.0)"};
`;

export const Popup = styled.div<{ id?: number }>`
  border-radius: 6px;
  height: 100%;
  width: 100%;
  font-family: ProximaNova, sans-serif;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  font-weight: 600;
  ${rtl`
    place-items: start;
  `}
`;

export const PopupTitleContainer = styled.div`
  height: 67px;
  width: 100%;
  position: absolute;
  bottom: 40px;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupTitle = styled.div`
  width: 80%;
  font-size: 14px;
  line-height: 1.21;
  color: #101010;
  background-color: white;
`;

export const PopupBottom = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: white;
  align-content: space-between;
  font-size: 16px;
  ${rtl`
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
  `}
`;

export const PopupCancel = styled.div`
  display: flex;
  cursor: pointer;
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: grey;
  padding-top: 11px;
  padding-bottom: 11px;
  border-top: 1px solid rgba(112, 112, 112, 0.1);
  ${rtl`
    border-right: 1px solid rgba(112, 112, 112, 0.1);
    border-bottom-left-radius: 6px;
  `}
`;

export const PopupDelete = styled.div`
  display: flex;
  cursor: pointer;
  flex: 1;
  border-top: 1px solid rgba(112, 112, 112, 0.1);
  align-content: center;
  align-items: center;
  justify-content: center;
  color: #e94f4f;
  padding-top: 11px;
  padding-bottom: 11px;
  ${rtl`
     text-align: left;
     border-left: 1px solid rgba(112, 112, 112, 0.1);
     border-bottom-right-radius: 6px;

  `}
`;

interface KPIFooterBadgeInterface {
  visible: boolean;
}

export const KPIFooterBadge = styled.div<KPIFooterBadgeInterface>`
  height: 16px;
  font-family: ProximaNova, sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: white;
  padding: 1px 7px;
  border-radius: 12px;
  background-color: #01044d;
  opacity: ${({ visible }) => (visible ? "1" : "0")};

  ${rtl`
      text-shadow: 0 3px 6px var(--black-16);
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  `}
`;

export const KPIFormulaName = styled.div`
  word-wrap: break-word;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `};
  color: #101010;
`;

export const SettingFlag = styled.div`
  display: flex;
  align-items: center;
`;

interface IFlagWrapper {
  isActiveKPI: boolean;
}

export const FlagWrapper = styled.div<IFlagWrapper>`
  position: absolute;
  ${rtl`
    right: 30px;
  `};
  display: flex;
  align-items: center;
  padding: 5px;
  opacity: ${({ isActiveKPI }) => (isActiveKPI ? 1 : 0.4)};
  cursor: ${({ isActiveKPI }) => (isActiveKPI ? "pointer" : "initial")};
  & > img {
    height: auto;
    width: 100%;
  }
`;

export const DotsWrapper = styled.div`
  position: absolute;
  ${rtl`
    right: 5px;
  `};
  display: flex;
  align-items: center;
  cursor: pointer;
  & > img {
    width: auto;
    height: 42px;
    padding: ${(props) => {
      if (props.theme.dir === "rtl") {
        return "10px 5px 10px 10px";
      } else {
        return "10px 10px 10px 5px";
      }
    }};
  }
  & > img:nth-child(2) {
    display: none;
  }
  &:hover {
    & > img:first-child {
      display: none;
    }
    & > img:nth-child(2) {
      display: block;
    }
  }
`;
