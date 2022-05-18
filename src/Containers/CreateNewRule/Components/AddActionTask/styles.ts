import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
//import { device } from "../../../../utils/devices";
export const AddTaskContainer = styled.div`
  background: #ffffff;
  margin: 0 24px 0 24px;
`;

export const AddSubTaskContainer = styled.div`
  background-color: #fbfbfb;
  margin-bottom: 20px;
  padding-bottom: 16px;
  padding-top: 16px;
`;

export const SubTask = styled.div`
  height: 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #101010;
  background-color: #ffffff;
  ${rtl`
      margin: 0 10.5px 8px 0;
      padding-left: 15px;
      text-align: left;
  `}
`;

export const AddTaskButton = styled.div<{ clicked?: boolean }>`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.clicked ? "hidden" : "visible")};
  cursor: ${(props) => (props.clicked ? "auto" : "pointer")};
  height: 16px;
  padding-top: 10px;
  padding-bottom: 18px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => (props.clicked ? "#4a4a4a" : "#0080ff")};

  ${rtl`
      margin: 0 0 0 14px;
      padding-right: 22px;
      text-align: left;
  `}

  .MuiSvgIcon-root {
    font-size: 1.2em;
    ${rtl`
        margin-right: 8.5px;
    `}
  }
`;

export const SaveSubTaskButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 110px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0080ff;
  ${rtl`
     
  `}
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 14px;
  background-color: #ffffff;
`;

export const SelectContainerLeft = styled.div`
  ${rtl`
       
  `}
  flex: 1;
  background-color: #ffffff;
`;

export const SelectContainerRight = styled.div`
  flex: 1;
  background-color: #ffffff;
  width: 100px;
`;

export const SelectTitle = styled.div<{
  paddingRight?: number;
  paddingTop?: number;
  paddingLeft?: number;
}>`
  height: 15px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding-top: ${(props) => props.paddingTop}px;
  padding-bottom: 16px;
  color: #1e3a55;
  padding-right: ${(props) => {
    if (props.theme.dir === "rtl") {
      return props.paddingLeft;
    } else {
      return props.paddingRight;
    }
  }}px;
  padding-left: ${(props) => {
    if (props.theme.dir === "rtl") {
      return props.paddingRight;
    } else {
      return props.paddingLeft;
    }
  }}px;
  ${rtl`
          text-align: left;
  `}

  background-color: #ffffff;
`;

/*
  padding-right: ${(props) => {
    if (props.theme.dir === "rtl") {
      return props.paddingRight;
    } else {
      return props.paddingRight;
    }
  }}px;

   */

export const SelectPriorityContainer = styled.div<{ marginTop?: number }>`
  display: flex;
  vertical-align: center;
  margin-top: ${(props) => props.marginTop}px;
`;
export const SelectPriorityTitle = styled.div<{
  marginRight?: number;
  marginLeft?: number;
  selected?: boolean;
}>`
  cursor: pointer;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  justify-content: center;
  display: flex;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-align: center;
  padding: 4px 12px 4px 12px;
  letter-spacing: normal;
  border: solid 0.5px #101010;
  border-radius: 12px;
  color: ${(props) => (props.selected ? "#ffffff" : "#101010")};
  background: ${(props) => (props.selected ? "#0080ff" : "#ffffff")};
  ${(props) => rtl`
          text-align: left;
          margin-right: ${props.marginRight}px;
          margin-left: ${props.marginLeft}px;
  `}
`;
export const SelectPriorityInput = styled.input<{
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: solid 0.5px #d1d1d1;
  background-color: #d1d1d1;
`;

export const CheckBoxInput = styled.input<{
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  order-radius: 2px;
  border: solid 0.5px #d6d6d6;
`;

export const ListContainer = styled.div`
  //padding-top: 17px;
`;
export const AddSubTaskLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  ${rtl`
        padding-left: 16px;
        padding-right: 15px;
  `}
  .MuiSvgIcon-root {
    color: #757575;
    font-size: 1.2em;

    ${rtl`
     
    `}
    cursor: pointer;
  }
`;

export const TaskLine = styled.div`
  display: flex;
  //justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  ${rtl`
        padding-left: 16px;
        padding-right: 15px;
  `}
  .MuiSvgIcon-root {
    color: #757575;
    font-size: 1.2em;

    ${rtl`
     
    `}
    cursor: pointer;
  }
`;

export const EditSaveSubTaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .MuiSvgIcon-root {
    color: #757575;
    font-size: 1.2em;
    cursor: pointer;
  }
`;

export const EditSaveSubTaskButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0080ff;
  ${rtl`
     
  `}
`;

export const InputLine = styled.input`
  background-color: transparent;
  cursor: pointer;
  display: flex;
  border: none;
  border-bottom: 1px #b5b5b5 solid;
  color: #050709;
  width: 85%;
  font-size: 14px;
  ${rtl`
        text-align: left;
        margin-left: 8px;
        margin-right: 17px;
  `}
`;
export const Task = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  cursor: pointer;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  align-items: center;
  line-height: 1.21;
  line-break: anywhere;
  letter-spacing: normal;
  color: #101010;
  ${rtl`
        text-align: left;
        margin-left: 8px;
        margin-right: 17px;
  `}
`;

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  :hover {
    .MuiSvgIcon-root {
      visibility: visible;
    }
  }

  .MuiSvgIcon-root {
    margin-left: 24px;
    visibility: hidden;
    color: #757575;
    font-size: 1.5em;
  }
`;

export const DeletePopUp = styled.div`
  position: fixed;
  border-radius: 6px;
  width: 236px;
  height: 200px;
  place-items: center;
  align-content: center;
  z-index: 1;
  top: 35%;
  ${rtl`
      right: 40%;
  `}
`;

export const BackgroundDeletePopUp = styled.div`
  position: fixed;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
export const EstimatedDurationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  padding-left: 24px;
`;

export const EstimatedTimeContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-right: 24px;
`;

export const EstimatedTimeInput = styled.input`
  display: flex;
  height: 40px;
  width: 136px;
  border: solid 0.5px #6c7481;
  border-radius: 4px;
  padding-left: 16px;
  font-size: 16px;
`;

export const EstimatedTimeTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
  padding-left: 8px;
`;

export const DropDownObjectContainer = styled.div`
  ${rtl`
     margin: 4px 0 17px 24px;
  `}
`;

export const DropDownLevelContainer = styled.div`
  ${rtl`
     margin: 4px 24px 17px 0;
  `}
`;

export const EstimatedContainer = styled.div`
  flex: 1;
`;

export const StyledIcon = styled.img<{ width: Number; height: Number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: pointer;
  color: #575757;
`;

export const StyledEditIcon = styled.img<{ width: Number; height: Number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: pointer;
  color: #575757;
  //visibility: hidden;
`;

export const StyledIconDelete = styled.img<{ width: Number; height: Number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  cursor: pointer;
  margin-right: 8px;
`;
