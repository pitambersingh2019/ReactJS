import styled from "styled-components";

export const StyledTooltipContainer = styled.div`
  position: relative;
  z-index: ${(props) => (props.show ? 200 : 0)};
`;

export const StyledTooltipBox = styled.div`
  position: absolute;
  padding: 10px;
  top: calc(100% + 5px);
  display: ${(props) => (props.isVisible ? "block" : "none")};
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  background-color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.25;
  width: ${(props) => (props.isWide ? "248px" : "unset")};
`;
