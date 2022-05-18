import styled, { css } from "styled-components";

const disabledStyles = css`
  background-color: #ecf3ff;
  color: #a8d4fe;
  border: solid 1px #ecf3ff;
`;

const defaultStyles = css`
  background-color: ${(props) => props.theme.colors.lightBlue2};
  color: ${(props) => props.theme.colors.primaryBlue};
  border: solid 1px ${(props) => props.theme.colors.lightBlue2};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue3};
    color: ${(props) => props.theme.colors.blue4};
  }
`;

const getButtonStyles = (disabled?: boolean) => {
  return disabled ? disabledStyles : defaultStyles;
};

export const XsButtonContainer = styled.button<{ disabled?: boolean }>`
  min-height: 24px;
  max-width: fit-content;
  display: flex;
  border-radius: 4px;
  align-items: center;
  padding: 0px 9px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  ${(props) => getButtonStyles(props.disabled)}
`;

export const Label = styled.div`
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;
