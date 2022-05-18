import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
import MenuIcon from "./MenuIcon";

export const MenuIconStyled3Dots = styled(MenuIcon)<{ open: boolean }>`
  width: 20px;
  height: 20px;
  fill: ${(p) => (p.open ? "#1268fb" : "#6c7481")};
  cursor: pointer;
  :hover {
    fill: #1268fb;
  }
`;

export const CardWrapper = styled.div<{ clicked?: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-radius: 6px;
`;

export const IsActiveLoadingContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const IsDeleteLoadingContainer = styled.div`
  background-color: rgb(255, 204, 204);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const CardContainer = styled.div<{ switchOn?: boolean }>`
  position: relative;
  place-items: start;
  background-color: ${(props) => (props.switchOn ? "#ffffff" : "#f9f9f9")};
  border-radius: 6px;
  width: 236px;
  height: 200px;
  transition: transform 0.2s; /* Animation */

  &.ShowCard {
    transform: scale(1.2);
    z-index: 2;
  }

  ${rtl`
          margin-right: 7px;
          margin-left: 7px;
          margin-bottom: 14px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  `}
`;

export const SwitchContainer = styled.div<{ menuActive?: boolean }>`
  display: flex;
  align-content: space-between;
  height: 30px;
  ${rtl`
           padding-left: 14px;
  `}
  align-items: center;
  > .MuiSvgIcon-root {
    color: ${(props) => (props.menuActive ? "#0080ff" : "#575757")};
    font-size: 1.5em;
    cursor: pointer;
  }
`;

export const SwitchToggle = styled.div`
  display: flex;
  padding-top: 10px;
`;
export const SwitchName = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  padding: 10px;
  width: 80%;
  color: #707071;
  ${rtl`
        text-align: left;
        padding-left: 19px;
  `}

  padding-top: 13px;
  width: 80%;
`;
export const SwitchTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin-bottom: 5px;
  color: #101010;
  ${rtl`
        text-align: left;
        padding-top: 18px;
        padding-left: 14px;
  `}
`;

export const HeaderSwitchAndTitle = styled.div`
  flex: 1;
`;

export const SwitchSubtitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14.7px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #101010;
  margin-bottom: 8px;
  width: 95%;
  height: 54px;
  ${rtl`
        text-align: left;
        padding-left: 14px;
  `}
`;

export const Footer = styled.div`
  height: 60px;
`;

export const Name = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  height: 18px;
  max-height: 18px;
  overflow-y: hidden;
  overflow-x: hidden;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #707071;
  ${rtl`
        text-align: left;
  `}
  padding-right: 14px;
  padding-left: 14px;
`;

export const Line = styled.div`
  display: flex;
  flex-grow: 1;
  align-content: space-between;
  justify-content: stretch;
  opacity: 0.1;
  width: 100%;
  border: solid 1px #979797;
  margin-top: 7px;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 9px;
  position: relative;
  ${rtl`
        padding-right: 11px;
        padding-left: 11px;
  `}
`;
export const Info = styled.div<{ newIsVisible?: boolean }>`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #9f9f9f;
  cursor: pointer;
  flex: 1;
  margin-top: ${(props) => (props.newIsVisible ? "-5" : "2")}px;
  ${rtl`
        text-align: left;
        padding: 0 0 11px 2px;
  `}
`;

export const NewContainer = styled.div<{ isVisible?: boolean }>`
  height: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
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
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};

  ${rtl`
        text-shadow: 0 3px 6px var(--black-16);
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  `}
`;

export const CardDropDownContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  ${rtl`
        padding-left: 115px;
        right:120px;
  `}
`;

export const CardDropDown = styled.nav<{ isActive?: boolean }>`
  background: #ffffff;
  position: absolute;
  z-index: 1;
  top: 5px;
  width: 104px;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  opacity: ${(props) => (props.isActive ? 1.0 : 0.0)};
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};

  ${rtl`
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  li {
    border-bottom: 1px solid rgba(112, 112, 112, 0.1);
  }
`;

export const CardDropDownList = styled.a`
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;

  ${rtl`
         text-align: left;
         padding: 11px 11px 11px;
  `}
  :hover {
    background-color: #0080ff;
    color: #ffffff;
  }
`;
export const CardDropDownRow = styled.div`
  display: flex;
  align-items: center;
  > .MuiSvgIcon-root {
    ${rtl`
         padding-right: 9px;
  `}
    font-size: 1.5em;
  }
`;
export const Popup = styled.div<{ deleteClicked?: boolean }>`
  position: absolute;
  visibility: hidden;
  border-radius: 6px;
  width: 236px;
  height: 200px;
  z-index: 1;
  visibility: ${(props) => (props.deleteClicked ? "visible" : "hidden")};
  background-color: ${(props) =>
    props.deleteClicked ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,1.0)"};
`;

export const StyledIconMenu = styled.img<{ width: Number; height: Number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: pointer;
  color: #575757;
  ${rtl`
          margin-right: 8px;
  `}
`;
