import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SelectEventContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 4px;
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
export const EventTitle = styled.div`
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
export const TriggerEventTitleContainer = styled.div`
  display: flex;
  padding-top: 15px;

  ${rtl`
       padding-left: 26px;
  `}
`;

export const TriggerEventTitle = styled.div`
  padding-top: 8px;
  height: 16px;

  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #4a4a4a;
  ${rtl`
         text-align: left;
         margin: 8px 0 38.5px 0;
  `}
`;
export const TriggerEventSelectedBox = styled.div`
  flex: 1;

  border: solid 1px #d1d1d1;
  width: 49px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #757575;
  ${rtl`
         text-align: left;
         margin: 0 26px 22.5px 27px;
         padding: 12px 10.2px 14px 12.8px;
  `}

  > .MuiSvgIcon-root {
    font-size: large;
    color: #757575;
  }
`;

// border: ${(props) => (props.typing ? "1" : "0")}px rgba(0, 0, 0, 0.16) solid;
export const Event_search = styled.div<{ typing?: boolean }>`
  text-align: center;
  display: flex;
  color: #7d7d7d;
  height: 40px;
  border-bottom: ${(props) => (props.typing ? "1" : "1")}px
    ${(props) => (props.typing ? "rgba(0, 0, 0, 0.16)" : "#ededed")} solid;
  font-size: large;
  justify-content: center;
  align-items: center;
  align-content: center;
  :hover {
    border: solid 1px #1268fb;
    border-radius: 4px;
  }
  ${rtl`
         padding: 5px 11px 2px 18px;
         margin-left: 24px;
         margin-right: 25px;
  `}
  > input {
    outline-width: 0;
    background-color: transparent;
    border: none;
    width: 100%;
    font-family: ${({ theme: { language } }) =>
      language === "eng" ? "ProximaNova" : "unset"};
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
  }
  .MuiSvgIcon-root {
    ${rtl`
        padding-right: 12px;
  `}
    color: #757575;
    font-size: 1.9em;
  }
`;

export const DoneEventContainer = styled.div`
  display: flex;
  ${rtl`
        padding: 0 12px 50px 24px;
  `}
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
  background-color: #ffffff;
`;

export const StopTitlesContainer = styled.div`
  display: flex;
  ${rtl`
        padding-left: 24px;
  `}
  padding-top: 16px;
  height: 200px;
  margin-bottom: 100px;
`;

export const StopGroupTitle = styled.div`
  height: 18px;
  ${rtl`
        margin: 0 0px 9px 6px;
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

export const StopCauseTitle = styled.div`
  height: 18px;

  ${rtl`
        margin: 0 22px 9px 46px;
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

export const EventSelection = styled.div`
  display: flex;
  height: 15px;
  margin: 35.5px 0 0 0;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
  `}
  color: #707070;
`;

export const DoneEventButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  ${rtl`
        margin: 35.5px 0 0 0;
        padding: 7px 25px;
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
export const CancelEventButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  ${rtl`
        margin: 35.5px 0 0 0;
        padding: 7px 25px;
  `}
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
  color: #954b7d;
`;
export const ButtonsContainer = styled.div`
  display: flex;
`;

export const GroupDrop_down_list_a = styled.a<{ selected?: boolean }>`
  ${rtl`
      padding: 12px 11px 11px 12px;
      text-align: left;
  `}
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  color: ${(props) => (props.selected ? "#0080ff" : "#575757")};
`;

export const CauseDrop_down_list_a = styled.a<{ selected?: boolean }>`
  ${rtl`
      padding: 12px 11px 11px 12px;
      text-align: left;
  `}
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  color: ${(props) => (props.selected ? "#0080ff" : "#575757")};
  //:hover {
  //  background-color: #0080ff;
  //  color: #ffffff;
  //}
`;

export const CauseDropSelectAll = styled.a<{ selected?: boolean }>`
  ${rtl`
      padding: 12px 11px 11px 12px;
      text-align: left;
  `}
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  color: ${(props) => (props.selected ? "#0080ff" : "#575757")};
  //:hover {
  //  background-color: #0080ff;
  //  color: #ffffff;
  //}
`;

export const GroupDrop_down_container = styled.div`
  ${rtl`
      margin-right: 15px;
  `}
  width: 300px;
`;

export const CauseDrop_down_container = styled.div`
  ${rtl`
      margin-right: 15px;
      margin-left: 46px;
  `}
  width: 300px;
`;

export const GroupDrop_down = styled.nav<{ border?: boolean }>`
  background: #ffffff;
  top: 38px;
  width: 100%;
  height: 40vh;
  border-right: solid ${(props) => (props.border ? 1 : 0)}px #d1d1d1;
  overflow-y: scroll;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &::-webkit-scrollbar {
    width: 6px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e3e3e3;
  }
`;
export const SelectCauseCheckBox = styled.input<{
  width?: number;
  height?: number;
  visible?: boolean;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: solid 0.5px #d1d1d1;
  background-color: #d1d1d1;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  cursor: pointer;
`;

export const SelectMachinedInput = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: solid 0.5px #101010;
  background-color: ${(props) => (props.checked ? "#6d6dc5" : "#ffffff")};
  border-radius: 2px;
`;

export const Stop_cause_line = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectedCauses = styled.div`
  position: relative;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-bottom: 25px;
`;

export const SelectedCausesSpan = styled.span<{ visible?: boolean }>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
  margin-right: 5px;
`;

export const RowGroup = styled.div`
  :hover {
    background-color: #f4f2ff;
    color: #101010;
  }
`;

export const SearchContainer = styled.div`
  ${rtl`
      margin: 16px 24px 0 24px;
  `}
  height: 300px;
`;

export const SearchStopCauseContainer = styled.div<{ selected?: boolean }>`
  margin-top: 16px;

  color: ${(props) => (props.selected ? "#0080ff" : "#575757")};
  :hover {
    background-color: #e6effd;
    color: #101010;
  }
`;

export const SearchStopCause = styled.div<{ selected?: boolean }>`
  ${rtl`
      padding: 0 11px 2px 6px;
      text-align: left;
  `}
  display: block;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  // color: ${(props) => (props.selected ? "#0080ff" : "#575757")};
  // :hover {
  //   background-color: #e6effd;
  //   color: #101010;
  // }
`;

export const SearchDropDownContainer = styled.div`
  padding-bottom: 12px;

  ${rtl`
     
  `}
  height: 15px;
  width: 300px;
`;

export const SearchContainerNew = styled.div`
  padding: 0 10px 0 10px;
`;

export const SearchStopCauseBorderLine = styled.div`
  //border-bottom: solid 0.5px #d1d1d1;
  //padding-bottom: 10px;
`;

export const SearchStopCauseBorder = styled.div`
  //border: solid 1.5px #d1d1d1;
`;
