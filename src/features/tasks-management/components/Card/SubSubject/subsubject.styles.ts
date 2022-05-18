import styled from "styled-components";

export const SubSubjectWrapper = styled.div`
  overflow: hidden;
`;

export const SubSubjectContainer = styled.div<{
  withTopMargin: boolean;
  showCursor: boolean;
}>`
  font-size: 14px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.21;
  margin-top: ${(props) => (props.withTopMargin ? "16px" : "0px")};
  margin-inline-start: ${(props) => (props.withTopMargin ? "0px" : "4px")};
  cursor: ${(props) => (props.showCursor ? "pointer" : "default")};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TooltipContainer = styled.div`
  position: relative;
  left: -10px;
`;

export const SubSubjectTooltip = styled.div`
  min-height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  top: 0;
  padding: 8px 7px;
  white-space: initial;
  z-index: 100;

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;
