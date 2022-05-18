import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Filtercontainer = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  height: 40px;
  padding-bottom: 8px;
  color: #101010;

  ${rtl`
        padding-left: 10px;
  `}
`;
export const DeleteSelectedItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Filteritems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .MuiSvgIcon-root {
    color: #101010;
    font-size: large;
  }
`;

export const Filteritemfilter = styled.div`
  display: flex;
  align-items: center;
`;

export const Filtertitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
`;

export const DeleteTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  ${rtl`
      text-align: left;
  `}
`;
export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  width: 100px;
  height: 30px;

  border-radius: 4px;
  border: solid 1px #ebebeb;
  ${rtl`
          margin-left: 10px;
          padding: 8px 11px 8px 8.9px;
  `}
`;

export const Filteritemsort = styled.div`
  display: flex;
  align-items: center;
  ${rtl`
         padding-left: 27px;
  `}
`;

export const Filteritemgroup = styled.div`
  display: flex;
  align-items: center;
  ${rtl`
          padding-left: 34px;
  `}
`;

export const Filtermenu = styled.div`
  display: flex;
  ${rtl`
          align-items: flex-end;
  `}
  cursor: pointer;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
`;

export const IconFilter = styled.img<{ rotate?: string }>`
  height: 32px;
  width: 32px;
  cursor: pointer;
  transform: rotate(${(props) => (props.rotate === "true" ? "180" : "0")}deg);
  transition: all 0.5s;
`;

export const IconFilterNew = styled.img<{ rotate?: string }>`
  height: 25px;
  width: 25px;
  margin-top: 5px;
  cursor: pointer;
  transform: rotate(${(props) => (props.rotate === "true" ? "180" : "0")}deg);
  transition: all 0.5s;
`;
