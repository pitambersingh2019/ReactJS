import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const DeviationContainer = styled.div`
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
  min-width: 100%;

  /*
   display: flex;
  flex-direction: column;
  margin-top: 48px;
  border-radius: 4px;
  ${rtl`
     box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}
  border: solid 1px #ebebeb;
  margin-bottom: 35px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  min-width: 100%;
  height: 100%;
   */
  margin-bottom: 24px;
  height: 100%;
  // overflow-y: scroll;
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

export const DeviationTitle = styled.div`
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
  height: 39px;

  color: white;
  ${rtl`
      padding: 9px 10px 12px 16px;
      text-align: left;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
  `}
`;
export const DeviationSubject = styled.div`
  padding-top: 20px;

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
      margin: 0 0 12px 24px;
      text-align: left;
  `}
`;

export const TimeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  ${rtl`
      padding: 0 12px 0 0;
  `}

  background-color: #ffffff;
`;

export const DeviationBodyContainer = styled.div`
  margin: 24px 24px 0 24px;
  padding-bottom: 140px;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: baseline;
`;

export const DropDownDeviationContainer = styled.div`
  margin: 4px 0 17px 0;
`;

export const SelectPeriodRight = styled.div`
  flex: 1;
  background-color: #ffffff;
  ${rtl`
        padding-left: 12px;
  `}
`;

export const SelectPeriodLeft = styled.div`
  flex: 1;
  background-color: #ffffff;
  ${rtl`
        padding-right: 12px;
  `}
`;

export const AmountOfTimeInput = styled.input`
  display: flex;
  width: 100%;
  height: 40px;
  border: solid 1px #6c7481;
  border-radius: 4px;
  margin-top: 4px;
  font-size: 16px;
  ${rtl`
        padding-left: 16px;
  `}
`;

export const DatePickerContainer = styled.div`
  margin: 8px 0 17px 0;
`;
