import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SendMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${rtl`
       padding: 16px 24px 0 26px;
  `}
`;
export const ActionDescription = styled.div<{ paddingLeft: boolean }>`
  padding-left: ${(props) => (props.paddingLeft ? 16 : 0)}px;
  padding-bottom: 10px;
  height: 15px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  ${rtl`
         text-align: left;
  `}
`;

export const FlexContainer = styled.div`
  flex: 1;
`;

export const InputContainer = styled.div`
  display: flex;
`;
export const InputDescription = styled.textarea`
  width: 100%;
  display: flex;
  flex: 1;
  height: 160px;

  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #757575;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: transparent;
  ${rtl`
         text-align: left;
         margin: 0 0 24px 16px;
         padding: 12px 0 52px 12.8px;
  `}
  ::-webkit-input-placeholder {
    color: #757575;
  } /* Chrome/Opera/Safari */
  ::-moz-placeholder {
    color: #757575;
  } /* Firefox 19+ */
  :-ms-input-placeholder {
    color: #757575;
  } /* IE 10+ */
  :-moz-placeholder {
    color: #757575;
  } /* Firefox 18- */
`;
export const VerticalLine = styled.input`
  background-color: transparent;
  border: none;

  width: 0px;
  height: 328px;
  ${rtl`
        border-left: 1px #979797 solid;
  `}
`;
export const SelectContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  color: #4a4a4a;
  padding-top: 12px;

  .MuiSvgIcon-root {
    font-size: medium;
    cursor: pointer;
    color: ${(props) => (props.checked ? "#69aefd" : "#1580fc")};
  }
`;

export const SelectSubContainer = styled.div`
  ${rtl`
       padding-left: 20px;
  `}
`;

export const Group_title = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};

  color: #4a4a4a;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  ${rtl`
       padding-left: 30px;
  `}
`;
export const SelectMachinedTitle = styled.div<{
  marginRight?: number;
  marginLeft?: number;
}>`
  height: 18px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  margin-right: ${(props) => props.marginRight}px;
  margin-left: ${(props) => props.marginLeft}px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #101010;
  ${rtl`
        text-align: left;
  `}
`;
export const SelectMachinedInput = styled.input<{
  width?: number;
  height?: number;
  marginLeft?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-left: ${(props) => props.marginLeft}px;
  border: solid 0.5px #d1d1d1;
  background-color: #d1d1d1;
`;
