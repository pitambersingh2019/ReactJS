import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Setting = styled.div`
  width: 460px;
  height: 100%;
  border-right: 3px solid #eaeaea;
  overflow-y: auto;
  padding: 0 15px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const SettingTitle = styled.div`
  text-align: start;
  color: #6d747a;
  font-size: 16px;
`;

export const SettingRangeTitle = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const SettingRangeTitleText = styled.div`
  text-align: start;
  font-family: ProximaNova, sans-serif;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  color: #101010;
`;

export const SettingRangeTitleImg = styled.div`
  width: 15px;
  ${rtl`
    margin-left: 10px;
  `};
  & > img {
    width: 100%;
    height: auto;
  }
`;

interface IRow {
  setBorder: boolean;
}

export const SettingWrapperRow = styled.div<IRow>`
  border-bottom:${(props) => (props.setBorder ? "1px solid #6d747a" : "unset")}
  &:first-child {
    padding-right: 10px;
  }
  &:last-child {
    padding-left: 10px;
  }
`;
