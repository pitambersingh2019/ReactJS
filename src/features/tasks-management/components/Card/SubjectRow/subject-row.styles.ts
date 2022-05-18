import styled from "styled-components";

export const SubjectRowContainer = styled.div<{
  isSmallMargin: boolean;
  showCursor: boolean;
}>`
  display: flex;
  align-items: center;
  margin-top: ${(props) => (props.isSmallMargin ? "1px" : "17px")};
  margin-bottom: ${(props) => (props.isSmallMargin ? "1px" : "8px")};
  cursor: ${(props) => (props.showCursor ? "pointer" : "default")};
  position: relative;
`;

export const Subject = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.21;
  margin-inline-end: 4px;
  white-space: nowrap;
`;

export const Tooltip = styled.div`
  min-height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  top: 15px;
  left: 0px;
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
