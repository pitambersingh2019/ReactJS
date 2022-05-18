import styled from "styled-components";

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
  height?: number;
  width?: number;
  isActive?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : "46px")};
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  margin-bottom: 0.8em;
  padding: 0.4em 0.4em 0.4em 0.4em;
  border-bottom-left-radius: ${(props) => (props.isActive ? "0" : "4")}px;
  border-bottom-right-radius: ${(props) => (props.isActive ? "0" : "4")}px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  cursor: pointer;
  border: solid 1px #6c7481;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;
  background: #ffffff;
  user-select: none;
  > .MuiSvgIcon-root {
    font-size: 1.5em;
  }

  :hover {
    border: solid 1px #1268fb;
  }
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 37px;
  width: 100%;
  z-index: 2;
  height: fit-content;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border: solid 1px #6c7481;
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
  padding: 12px 11px 11px 12px;
  list-style: none;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: 1px solid rgba(112, 112, 112, 0.1);
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#0080ff" : "#575757 ")};
  user-select: none;
  &:hover {
    background-color: #0080ff;
    color: #ffffff;
  }
`;

export const DropDownInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
`;
