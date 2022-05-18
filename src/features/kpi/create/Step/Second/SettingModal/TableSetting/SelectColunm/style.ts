import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div``;

export const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 12px;
  background-color: #ecf1f7;
  white-space: nowrap;
  border-bottom: solid 1px white;
  border-right: solid 1px white;
`;

interface IItem {
  isLast: boolean;
}
export const WrapperItem = styled.div`
  border-right: solid 1px #e3e3e3;
`;

export const Itemcolumn = styled.div<IItem>`
  display: flex;
  align-items: center;
  height: 48px;
  white-space: nowrap;
  border-bottom: ${(props) => (props.isLast ? "unset" : "solid 1px #e3e3e3;")};
  ${rtl`
    padding-left: 12px;
  `};
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #101010;
  & > input {
    cursor: pointer;
  }
`;
