import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const DropDownContainer = styled.div<{
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  width?: number;
}>`
  position: relative;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
`;

export const DropDownHeader = styled.div<{
  fitContent?: boolean;
  border?: boolean;
  width?: number;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: ${(props) =>
    props.fitContent
      ? `max-content`
      : props.width
      ? `${props.width}px`
      : "100%"};
  margin-bottom: 0.8em;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) =>
    props.border === true
      ? "solid 1px #d1d1d1"
      : props.border === false
      ? "unset"
      : "solid 1px #d1d1d1"};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;
  background: #ffffff;
  user-select: none;

  ${rtl`
     padding: 0.4em 0.4em 0.4em 0.4em;
`}
`;

export const DropDownListContainer = styled.div<{
  fitContent?: boolean;
  width?: number;
}>`
  position: absolute;
  bottom: 0;
  top: 40px;
  width: ${(props) =>
    props.fitContent
      ? `max-content`
      : props.width
      ? `${props.width}px`
      : "100%"};
  z-index: 2;
  height: fit-content;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border: solid 1px #e3e3e3;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  &::-webkit-scrollbar {
    width: 5px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e3e3e3;
  }
`;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
`;

export const ListItem = styled.li<{ isSelected: boolean }>`
  list-style: none;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  font-weight: 600;
  letter-spacing: normal;

  // color: #000;

  ${rtl`
       text-align: left;
       padding: 12px 11px 11px 12px;
  `}

  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#1268fb" : "#000000")};
  user-select: none;
  &:hover {
    background-color: #ebf7ff;
  }
`;

export const DropDownText = styled.div`
  outline: none;
  border: none;
  width: 100%;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  ${rtl`
       text-align: left;
       margin-left: 10px;

  `}
  color: #000;
`;
