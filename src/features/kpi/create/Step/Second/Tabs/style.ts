import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Tab = styled.div`
  width: fit-content;
  height: 24px;
  ${rtl`
    margin-right: 8px;
  `};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  background-color: #f6f7fc;
  padding: 6px;
`;

export const TabName = styled.div`
  white-space: nowrap;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #101010;
  ${rtl`
    margin-right: 4px;
  `};
`;

export const WrapperCloseImg = styled.div`
  height: 18px;
  & > img {
    height: 100%;
    width: auto;
    cursor: pointer;
  }
`;

export const TooltipWrapper = styled.div`
  max-height: 100px;
  padding-right: 10px;
  overflow-y: auto;
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

export const TooltipText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #000;
`;
