import styled, { css } from "styled-components";

const primaryStyles = css`
  background-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.white};
  border: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.purpleHover};
  }
`;

const primaryDisabledStyles = css`
  background-color: ${(props) => props.theme.colors.purpleDisabled};
  color: ${(props) => props.theme.colors.white};
  border: none;
`;

const secondaryStyles = css`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.purple};
  border: solid 1px ${(props) => props.theme.colors.purple};

  &:hover {
    color: ${(props) => props.theme.colors.purpleHover};
    border: solid 1px ${(props) => props.theme.colors.purpleHover};
  }
`;

const secondaryDisabledStyles = css`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.purpleDisabled};
  border: solid 1px ${(props) => props.theme.colors.purpleDisabled};
`;

const purpleStyles = css`
  background-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.white};
  border: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.purpleHover};
  }
`;

const purpleDisabledStyles = css`
  background-color: ${(props) => props.theme.colors.purpleDisabled};
  color: ${(props) => props.theme.colors.white};
  border: none;
`;

const secondaryPurpleStyles = css`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.purple};
  border: solid 1px ${(props) => props.theme.colors.purple};
`;
const secondaryPurpleDisabledStyles = css`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.purpleDisabled};
  border: solid 1px ${(props) => props.theme.colors.purpleDisabled};
`;
const getButtonStyles = (
  variant?: "primary" | "secondary" | "purple" | "purple-secondary",
  disabled?: boolean
) => {
  if (variant === "primary") {
    return disabled ? primaryDisabledStyles : primaryStyles;
  }
  if (variant === "secondary") {
    return disabled ? secondaryDisabledStyles : secondaryStyles;
  }
  if (variant === "purple") {
    return disabled ? purpleDisabledStyles : purpleStyles;
  }
  if (variant === "purple-secondary") {
    return disabled ? secondaryPurpleDisabledStyles : secondaryPurpleStyles;
  }
};

export const CustomButtonContainer = styled.button<{
  variant?: "primary" | "secondary" | "purple" | "purple-secondary";
  disabled?: boolean;
  width?: string;
  size?: "lg" | "md" | "sm" | "ssm";
}>`
  min-width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) =>
    props.size === "lg"
      ? "40px"
      : props.size === "md"
      ? "32px"
      : props.size === "sm"
      ? "32px"
      : "24px"};
  padding: 0 12px;
  font-family: ProximaNova;
  font-size: ${(props) => (props.size === "sm" ? "14px" : "16px")};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  ${(props) => getButtonStyles(props.variant, props.disabled)}
`;

export const Icon = styled.img<{ iconHeight: string }>`
  height: ${(props) => props.iconHeight};
  margin-inline-end: 8px;
`;
