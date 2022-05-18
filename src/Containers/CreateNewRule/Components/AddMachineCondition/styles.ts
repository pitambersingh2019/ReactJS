import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const AddMachineConditionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 34px;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  margin-bottom: 24px;
  height: 67vh;

  overflow-y: hidden;
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
  background: #ffffff;
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

export const Condition_dropDown = styled.div`
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

export const Condition_dropDown_container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input_amount = styled.input`
  background-color: transparent;
  cursor: pointer;
  display: flex;
  border: 1px #b5b5b5 solid;
  border-radius: 4px;
  color: #7d7d7d;
  width: 100%;
  height: 45px;
  font-size: 14px;
  margin-top: 4px;
  padding-left: 16px;
  ${rtl`
        text-align: left;
      
  `}
`;

export const Condition_input_container = styled.div`
  display: flex;
  padding-top: 24px;
  padding-left: 36px;
`;

export const SelectInputText = styled.div`
  height: 16px;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #404d61;
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

export const DoneMachineContainer = styled.div`
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

export const DropDownGroupContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 10px 0;
`;
