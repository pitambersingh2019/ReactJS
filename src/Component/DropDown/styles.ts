import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const DropDownContainer = styled.div<{
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  width?: number;
  height?: number;
  disableShadow?: boolean;
  flex?: boolean;
  nonPaddingTop?: boolean;
  nonPaddingBottom?: boolean;
  background?: string;
}>`
  position: relative;
  flex: ${(props) => (props.flex ? "1" : "0")};
  cursor: pointer;
  border: none;
  ${(props) => rtl`
      margin-left: ${props.marginLeft}px;
      margin-right: ${props.marginRight}px;
  `}

  margin-bottom: ${(props) => props.marginBottom}px;
  margin-top: ${(props) => props.marginTop}px;
  padding-top: ${(props) => (props.nonPaddingTop ? 0 : 4)}px;
  padding-bottom: ${(props) => (props.nonPaddingBottom ? 0 : 12)}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.background ? "#ffffff" : "none")};
`;
export const DropDownList = styled.nav<{
  isActive?: boolean;
  height?: number;
  setWidth?: boolean;
  scrolling?: string;
  top?: number;
  disableBorder?: boolean;
}>`
  background: #ffffff;
  position: absolute;
  z-index: 1;
  top: ${(props) => props.top}px;
  cursor: pointer;
  width: ${(props) => (props.setWidth ? "max-content" : "100%")};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid ${(props) => (props.disableBorder ? 0 : 1)}px #6c7481;
  border-top: solid ${(props) => (props.setWidth ? 0 : 0.5)}px #757575;
  opacity: ${(props) => (props.isActive ? 1.0 : 0.3)};
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};
  height: ${(props) => props.height}px;
  overflow-y: ${(props) => (props.scrolling === "true" ? "scroll" : "hidden")};
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
export const DropDownListA = styled.a<{ selected?: boolean }>`
  ${rtl`
     padding: 12px 11px 11px 12px;
     text-align: left;
  `}
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => (props.selected ? "#050709" : "#404d61")};
  :hover {
    background-color: #f4f2ff;
    color: #101010;
  }
`;
export const DropDownButtonTrigger = styled.button<{
  isActive?: boolean;
  disableBorder?: boolean;
}>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 19px;
  padding-bottom: 19px;
  ${rtl`
     padding-left: 12px;
  `}
  border-bottom-left-radius: ${(props) => (props.isActive ? "0" : "4")}px;
  border-bottom-right-radius: ${(props) => (props.isActive ? "0" : "4")}px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border: solid 1px
    ${(props) => (props.disableBorder ? "transparent" : "#6c7481")};
  vertical-align: middle;
  background: none;
  span {
    font-family: ${({ theme: { language } }) =>
      language === "eng" ? "ProximaNova" : "unset"};
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    ${rtl`
     text-align: left;
    `}
  }

  .MuiSvgIcon-root {
    font-size: 1.7em;
    color: #575757;
    ${rtl`
     margin-right: 5px;
    `}
  }

  :hover {
    border: solid 1px #1268fb;
  }
`;
