import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
import { device } from "../../utils/devices";
export const Body = styled.div`
  top: 70px;
  margin-top: 20px;
  padding-left: 24px;
  padding-right: 24px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ///width: 80%;
  width: 80%;
  height: 90%;
  @media ${device.laptop} {
    width: 80%;
  }

  /* overflow-y: auto;
  &::-webkit-scrollbar {
      width: 4px;
      margin:5px;
  }
 
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  } */
`;

export const TriggersContainer = styled.div`
  position: relative;
  min-width: 898px;
  height: 100%;
  overflow: hidden;

  /// width: 100%;
`;
export const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  ///width: 76%;
  min-width: 898px;
  @media ${device.laptop} {
    width: 898px;
  }
  justify-content: space-between;
`;
export const Header = styled.div`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > .MuiSvgIcon-root {
    cursor: pointer;
    position: fixed;
    display: flex;
    ${rtl`
         right: 24px;
    `}
    color: gray;
  }
  top: 20px;
  position: absolute;
`;
export const CreateRule = styled.div`
  //padding: 24px;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
`;

export const RuleNameContainer = styled.div`
  display: flex;
  align-items: center;

  > .MuiSvgIcon-root {
    color: #575757;
    font-size: 3.6rem;
    cursor: pointer;
    ${rtl`
        padding-left: 15px;
    `}
    justify-content: center;
  }
`;
export const InputRuleName = styled.input<{ Width: number }>`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  width: ${(props) => `${props.Width}ch`};
  letter-spacing: normal;
  color: #000000;
  border: none;
  font-family: ${({ theme: { dir } }) => (dir === "rtl" ? "unset" : "unset")};
  ${rtl`
        text-align: left;
  `}

  background-color: transparent;
  ::-webkit-input-placeholder {
    color: #6c7481;
  } /* Chrome/Opera/Safari */
  ::-moz-placeholder {
    color: #6c7481;
  } /* Firefox 19+ */
  :-ms-input-placeholder {
    color: #6c7481;
  } /* IE 10+ */
  :-moz-placeholder {
    color: #6c7481;
  } /* Firefox 18- */
`;

export const TriggerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TriggerLine = styled.div<{
  stepTow?: boolean;
  stepThree: boolean;
}>`
  width: 3px;
  height: 24px;
  background-color: ${(props) =>
    props.stepTow ? (props.stepThree ? "#0080ff" : "#5aca96") : "#954b7d"};
  border-radius: 5px;
  ${rtl`
        margin-right: 14px;
  `}
`;

export const TriggerTitle = styled.div<{
  stepTow?: boolean;
  stepThree: boolean;
}>`
  opacity: 0.7;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) =>
    props.stepTow ? (props.stepThree ? "#0080ff" : "#38a573") : "#7e2d64"};
  ${rtl`
        text-align: left;
  `}
`;

export const TriggerInfo = styled.div`
  opacity: 0.7;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  ${rtl`
        text-align: left;
  `}
`;

export const StepsTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  color: grey;
  ${rtl`
    text-align: right;
    padding-right: 25px;
  `}
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  ${rtl`
      text-align: right;
  `}
`;

export const Step = styled.div<{ currentStep?: boolean }>`
  height: 7px;
  width: 26px;
  background-color: ${(props) => (props.currentStep ? "#5900d3" : "#afafaf")};
  border-radius: 10px;
  ${rtl`
      margin: 10px 6px 6px 3px;
  `}
`;
export const SelectTriggerTitle = styled.div`
  padding-top: 48px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  ${rtl`
     text-align: left;
     margin: 0 0 0 0;
  `}
`;

export const LoadingContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
`;

export const NextContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  place-items: center;
  padding: 17px;
  margin-bottom: 10px;
`;

export const NextButton = styled.div<{ active?: boolean }>`
  padding: 11px 44px;
  border-radius: 4px;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  background-color: ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: white;
  border: solid 1px ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
`;

export const BackButton = styled.div<{ active?: boolean }>`
  padding: 11px 44px;
  border-radius: 4px;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  background-color: white;
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  color: #5900d3;
  border: solid 1px #5900d3;
  ${rtl`
        margin-right: 16px;
  `}
`;

export const AddConditionContainer = styled.div<{
  visible?: boolean;
  clicked?: boolean;
}>`
  display: flex;
  margin-top: 24px;
  align-items: center;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

export const AddConditionButton = styled.div<{ clicked?: boolean }>`
  display: flex;
  cursor: ${(props) => (props.clicked ? "auto" : "pointer")};
  align-items: center;
  color: ${(props) => (props.clicked ? "#954b7d" : "#1268fb")};
  font-size: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: 600;

  > .MuiSvgIcon-root {
    font-size: 2.6rem;
    ${rtl`
       
    `}
    justify-content: center;
  }
`;
export const AddCondition = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  color: #954b7d;
  font-size: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: 600;
  padding-top: 24px;
`;

export const ConditionDropDown = styled.div<{ visible?: boolean }>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  margin-top: 24px;
  align-items: center;
  color: #404d61;
  font-size: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-weight: 600;
`;

export const TriggerConditionsRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  margin-bottom: 35px;
  height: 63vh;

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
`;
export const ActionRowRowContainer = styled.div`
  margin-top: 48px;
  flex-direction: column;
  justify-content: center;
`;
