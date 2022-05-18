import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SelectDateContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 34px;
  border-radius: 4px;
  border: solid 1px #ebebeb;

  ${rtl`
       box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}
  background-color: #ffffff;
  margin-bottom: 24px;
  min-width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
export const DateTitle = styled.div`
  background-color: #954b7d;
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
  color: white;
  height: 39px;
  ${rtl`
        text-align: left;
         padding: 9px 10.8px 12px 16px;
         border-top-left-radius: 4px;
         border-top-right-radius: 4px;
  `}
`;
export const TriggerTitleContainer = styled.div`
  padding-top: 15px;
  align-content: center;
  ${rtl`
        padding-left: 24px;
  `}
`;

export const TriggerTimeContainer = styled.div`
  display: flex;
  padding-top: 9px;
  align-content: center;
  align-items: center;
  ${rtl`
        padding-left: 24px;
  `}
`;

export const TriggerTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  color: #4a4a4a;
  ${rtl`
         text-align: left;
         margin: 8px 0 4px 0;
  `}
`;
export const TriggerSelectedBox = styled.div`
  flex: 1;
  display: flex;
  border: solid 1px #d1d1d1;
  background-color: white;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #050709;
  ${rtl`
         text-align: left;
         margin: 0 20px 0 0;
         padding: 12px 0 12px 12.8px;
  `}

  > .MuiSvgIcon-root {
    font-size: large;
    color: #757575;
  }
`;

export const Month = styled.div`
  ${rtl`
      padding-left: 0;
  `}
  margin-bottom: 100px;
`;
export const Week = styled.div`
  display: flex;
  ${rtl`
      padding-left: 25px;
  `}
`;

export const MonthForWeek = styled.div`
  ${rtl`
      padding-left: 0;
  `}
  margin-bottom: 150px;
`;

export const Day = styled.div<{ clicked?: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  width: 32px;
  height: 32px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => (props.clicked ? "#ffffff" : "#050709")};
  background-color: ${(props) => (props.clicked ? "#954b7d" : "#ffffff")};
  border-radius: 16px;
  ${rtl`
     margin: 0 27px 9px 0;
  `}
`;

export const NoteContainer = styled.div`
  display: flex;

  position: absolute;
  width: 100%;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  ${rtl`
      padding: 0 12px 16px 25px;
  `}

  background-color: #ffffff;
`;

export const Note = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;

  color: #cc001f;
  ${rtl`
        margin: 35px 59px 0 8px;
        text-align: left;
  `}
`;

export const DoneButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  ${rtl`
       padding: 7px 25px;
       margin: 35.5px 0 0 0;
  `}
  background-color: #954b7d;
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
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DailyBottomContainer = styled.div`
  height: 200px;
`;
