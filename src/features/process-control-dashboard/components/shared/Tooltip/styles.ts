import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  top: 20px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 50%;" : "right: 50%;")}
`;

export const Content = styled.div`
  min-height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  padding: 8px 7px;
  white-space: initial;
  z-index: 100;
  min-width: 256px;

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;
