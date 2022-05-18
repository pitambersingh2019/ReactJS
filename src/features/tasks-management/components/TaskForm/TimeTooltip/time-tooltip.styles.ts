import styled from "styled-components";

export const TimeTooltipContainer = styled.div<{ isHeader?: boolean }>`
  width: fit-content;
  height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  top: ${(props) => (props.isHeader ? "25px" : "15px")};
  padding: 8px 7px;

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
`;
