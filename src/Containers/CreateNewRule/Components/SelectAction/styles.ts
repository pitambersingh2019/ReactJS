import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SelectActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  border-radius: 4px;
  ${rtl`
     box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}
  border: solid 1px #ebebeb;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  ///width: 100%;
  min-width: 898px;
  max-width: 910px;
  height: 100%;
`;
export const ActionTitle = styled.div`
  background-color: #5aca96;
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  height: 39px;

  color: white;
  ${rtl`
      padding: 9px 10px 12px 16px;
      text-align: left;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
  `}
`;
export const ActionSubject = styled.div`
  padding-top: 20px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
      margin: 0 0 0 24px;
      text-align: left;
  `}
`;

export const ActionDescription = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
      text-align: left;
      margin: 0 24px 4px 24px;
  `}
`;

export const InputContainer = styled.div`
  display: flex;
`;
export const InputDescription = styled.textarea`
  width: 100%;
  height: 80px;
  max-height: 300px;
  resize: vertical;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #050709;
  border-radius: 4px;
  border: solid 1px #6c7481;
  background-color: transparent;
  ${rtl`
      text-align: left;
      margin: 0 24px 24px 24px;
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
export const DoneActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 12px;
  background-color: #ffffff;
  ${rtl`
      padding: 0 12px 16px 25px;
  `}
`;

export const ActionSelection = styled.div`
  display: flex;
  margin: 35.5px 0 0 0;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #707070;
  ${rtl`
      text-align: left;
  `}
`;

export const DoneActionButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 7px 25px;
  background-color: #5aca96;
  border-radius: 5px;
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
`;
export const CancelActionButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 7px 25px;
  background-color: white;
  border-radius: 5px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-right: 5px;
  color: #5aca96;
`;
export const ButtonsActionContainer = styled.div`
  display: flex;
`;

export const NotificationDropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NotificationTitle = styled.div`
  flex: 1;
  padding-top: 20px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
      text-align: left;
      padding-left: 24px;
  `}
`;

export const SubSubjectTitle = styled.div`
  flex: 1;
  padding-top: 20px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #404d61;
  ${rtl`
      text-align: left;
  `}
`;

export const ChangeActionContainer = styled.div`
  margin-right: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  .MuiSvgIcon-root {
    ${rtl`
        padding-right: 6px;
  `}
    font-size: 1.5em;
  }
`;

export const DropDownContainer = styled.div`
  margin: 0 24px 24px 24px;
`;

export const DropDownNotificationContainerOne = styled.div`
  ${rtl`
         margin: 0 24px 24px 24px;
  `}

  flex: 1;
`;

export const DropDownNotificationContainer = styled.div`
  flex: 1;
  // margin: 0 12px 24px 24px;
  ${rtl`
         margin: 0 12px 24px 24px;
  `}
`;

export const DropDownNotificationContainerR = styled.div`
  flex: 1;
  // margin: 0 24px 24px 12px;
  ${rtl`
         margin: 0 24px 24px 12px;
  `}
`;

export const DropDownHeightContainer = styled.div`
  // position: absolute;
  //width: 47.5%;
  margin-top: 0px;
`;

export const DropDownMainNotificationContainer = styled.div`
  width: 50%;
  ${rtl`
         margin: 0px 15px 17px 0;
  `}
`;

export const ScrollDropDown = styled.div<{ height?: number; task?: boolean }>`
  // overflow: visible;
  overflow-y: ${(props) => (props.task ? "auto" : "visible")};
  overflow-x: ${(props) => (props.task ? "hidden" : "visible")};
  height: ${(props) => props.height || "80%"}px;

  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }

  /*
  *{
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  
   */
`;
