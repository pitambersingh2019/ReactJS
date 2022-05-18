import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SceduleContainer = styled.div<{ actionRow: boolean }>`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  background-color: white;
  //width: 100%;
  min-width: 898px;
  max-width: 898px;
  ${rtl`
         padding: 5px 12px;
         margin: 14px 0 0 0;
         box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  `}
`;

export const IconContainer = styled.div<{
  background?: boolean;
  actionRow: boolean;
}>`
  > .MuiSvgIcon-root {
    font-weight: bolder;
    padding: 4px;
    color: ${(props) => (props.background ? "#ffffff" : "#575757")};
    background-color: ${(props) =>
      props.background ? (props.actionRow ? "#5aca96" : "#954b7d") : "#ffffff"};
    border-radius: 16px;
    cursor: ${(props) => (props.background ? "auto" : "pointer")};
  }
`;

export const SceduleFlex = styled.div<{ showMore: boolean }>`
  display: flex;
  align-items: ${(props) => (props.showMore ? "normal" : "center")};
`;

export const SceduleText = styled.div<{ actionRow?: boolean }>`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: ${(props) => (props.actionRow ? 14 : 16)}px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  ${rtl`
        text-align: left;
        margin: 4px 0 4px 28px;
  `}
`;
