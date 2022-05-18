import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const AddDurationConditionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 4px;
  margin-top: 34px;
  border: solid 1px #ebebeb;
  margin-bottom: 24px;
  min-width: 100%;
  height: 100%;
  background: #ffffff;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
    padding-top: 40px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
  ${rtl`
       box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}
`;

export const ConditionTitle = styled.div`
  background-color: #954b7d;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  ${rtl`
         text-align: left;
         padding: 9px 10.8px 12px 16px;
         border-top-left-radius: 4px;
         border-top-right-radius: 4px;
  `}
`;

export const ConditionDropDown = styled.div`
  flex: 1;
  margin-top: 24px;
  padding: 16px 24px 24px 24px;
  align-items: center;
  color: #404d61;
  font-size: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: 600;
`;

export const ConditionDropDownStyle = styled.div`
  flex: 1;
  margin-top: 24px;
  padding: 16px 24px 24px 24px;
  align-items: center;
`;

export const ConditionDropDownTitle = styled.div`
  position: absolute;
  z-index: 1;
  color: #404d61;
`;

export const ConditionDropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputAmount = styled.input`
  background-color: transparent;
  cursor: pointer;
  display: flex;
  border: 1px #6c7481 solid;
  border-radius: 4px;
  color: #101010;
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin-top: 4px;
  padding-left: 16px;
  ${rtl`
        text-align: left;
      
  `}
`;

export const ConditionInputContainer = styled.div`
  display: flex;
  padding-top: 24px;
  padding-left: 36px;
`;

export const ConditionRadioButton = styled.div<{ clicked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 18px;
  line-height: 1.19;
  padding-right: 39px;
  color: ${(props) => (props.clicked ? "#050709" : "#404d61")};
  font-weight: ${(props) => (props.clicked ? "600" : "normal")};
`;

export const ConditionRadioTitle = styled.div`
  ${rtl`
         padding-left: 8px;
      
  `}
`;

export const DoneDurationContainer = styled.div`
  display: flex;
  ${rtl`
        padding: 0 12px 50px 24px;
  `}
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #ffffff;
`;

export const RadioButton = styled.input`
  width: 20px;
  height: 20px;
  background: rgb(105, 103, 116);
`;

/*
export const LabelStyled = styled(FormControlLabel)<{clicked?:boolean}>`

  color: ${props => props.clicked ? '#050709' : '#404d61'};
  font-weight: ${props => props.clicked ? '600' : 'normal'};
  line-height: 1.19;
  font-family: ProximaNova;
  & .MuiFormControlLabel-label {
    font-size: 16px;
  }

`;

 */
