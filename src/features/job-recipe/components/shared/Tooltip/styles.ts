import styled, { css } from "styled-components";

export type Position = "RIGHT" | "BOTTOM";

const getPlacement = (position: Position) => {
  if (position === "BOTTOM") {
    return css`
      top: 100%;
      ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
    `;
  }

  return css`
    top: -7px;
    ${(props) => (props.theme.dir === "rtl" ? `right: 110%;` : `left: 110%;`)}
  `;
};

export const StyledTooltip = styled.div<{ position: Position }>`
  min-height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  ${(props) => getPlacement(props.position)}
`;

export const Text = styled.div<{ minWidth?: string }>`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  white-space: normal;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "fit-content")};
  max-width: 200px;
  padding: 8px 7px;
`;
