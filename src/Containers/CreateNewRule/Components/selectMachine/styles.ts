import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SendMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
  ${rtl`
       padding: 16px 10px 0 0px;
  `}
`;
export const ActionDescription = styled.div`
  ${rtl`
    padding-left: 20px;
    text-align: left;
  `}
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
`;

export const FlexContainer = styled.div`
  flex: 1;
`;
export const InputContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;
export const InputDescription = styled.textarea`
  width: 100%;
  display: flex;
  flex: 1;

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
  border: solid 1px #6c7481;
  background-color: transparent;
  max-height: 400px;
  resize: vertical;
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

  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    margin: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }
`;
export const VerticalLine = styled.div`
  background-color: transparent;
  border: none;
  width: 1px;
  ${rtl`
        border-left: 1px #979797 solid;
  `}
`;
export const SelectContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  color: #4a4a4a;
  align-items: center;
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

export const Grouptitle = styled.div`
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
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};

  ${(props) => rtl`
         margin-right: ${props.marginRight}px;
         margin-left: ${props.marginLeft}px;
         text-align: left;
  `}
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #101010;
`;
export const SelectMachinedInput = styled.input<{
  width?: number;
  height?: number;
  marginLeft?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  ${(props) => rtl`
           margin-left: ${props.marginLeft}px;
  `}
  border: solid 0.5px #d1d1d1;
  background-color: #d1d1d1;
`;

export const TreeSelectContainer = styled.div`
  height: 100%;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;
