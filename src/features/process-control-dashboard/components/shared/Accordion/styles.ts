import styled, { css } from "styled-components";
import { AccordionProps } from ".";

const getPadding = (variant: AccordionProps["variant"], expanded: boolean) => {
  if (variant === "dashboard") {
    return "18px 0px 18px";
  }
  return expanded ? "12px 0px 0px" : "12px 0px 12px";
};

const getBorder = (variant: AccordionProps["variant"], expanded: boolean) => {
  if (variant === "dashboard") {
    return "none";
  }
  return css`
    ${(props) =>
      `1px solid ${
        expanded
          ? `${props.theme.colors.primaryBlue}`
          : `${props.theme.colors.lightGray5}`
      }`}
  `;
};

export const AccordionContainer = styled.div<{
  variant: AccordionProps["variant"];
  expanded: boolean;
}>`
  padding: ${(props) => getPadding(props.variant, props.expanded)};
  border-radius: 6px;
  box-shadow: ${(props) =>
    props.variant === "dashboard"
      ? "0 0 6px 0 rgba(0, 0, 0, 0.16)"
      : "0 3px 6px 0 rgba(0, 0, 0, 0.08)"};
  background-color: ${(props) =>
    props.variant === "dashboard"
      ? "#fafafa"
      : `${props.theme.colors.lightGray2}`};
  border: ${(props) => getBorder(props.variant, props.expanded)};
`;

export const SummaryContainer = styled.div<{
  arrowCentered: boolean;
  expanded: boolean;
  variant: AccordionProps["variant"];
}>`
  display: flex;
  align-items: ${(props) => (props.arrowCentered ? "center" : "flex-start")};
  cursor: pointer;
  padding-bottom: ${(props) =>
    props.variant === "form" && props.expanded ? "12px" : "0px"};
`;

export const ArrowIcon = styled.img<{
  expanded: boolean;
  arrowCentered: boolean;
}>`
  height: 16px;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.expanded ? `rotate(0deg)` : `rotate(-90deg)`)};
  margin-inline-end: 8px;
  margin-top: ${(props) => (props.arrowCentered ? "0px" : "2px")};
  margin-inline-start: 24px;
`;

export const ContentContainer = styled.div<{
  expanded: boolean;
  variant: AccordionProps["variant"];
}>`
  background-color: ${(props) =>
    props.variant === "dashboard" ? "inherit" : `${props.theme.colors.white}`};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
