import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SettingRangeTitle = styled.div`
  text-align: start;
  color: black;
  font-size: 20px;
`;

export const SettingTitle = styled.div`
  margin: 12px 0;
  text-align: start;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
`;

interface IRow {
  setBorder: boolean;
}

export const SettingWrapperRow = styled.div<IRow>`
  display: flex;
  border-bottom: ${(props) =>
    props.setBorder ? "1px solid #e5e5e5" : "unset"};
  padding-bottom: 16px;
  ${rtl`
     & > div:first-child {
    padding-right: 10px;
  }
  & > div:last-child {
    padding-left: 10px;
  }
  & > div:last-child:first-child {
    padding: 0;
  }
  `};
`;
