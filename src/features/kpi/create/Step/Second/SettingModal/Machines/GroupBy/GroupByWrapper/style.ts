import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: calc(100% - 110px);
`;

export const Title = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #404d61;
  margin-bottom: 16px;
`;

export const GroupNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: solid 1px #e4e7eb;
  padding-bottom: 16px;
  margin-bottom: 16px;
  padding-left: 1px;
  & > div {
    ${rtl`
    margin-left: 33px;
  `};
  }
  & > div:first-child {
    ${rtl`
    margin-left: unset;
  `};
  }
`;

export const ChildrenWrapper = styled.div`
  height: calc(100% - 120px);
  width: 100%;
`;
