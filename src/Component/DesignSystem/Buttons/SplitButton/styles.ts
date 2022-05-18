import styled, { css } from "styled-components";

const defaultStyles = css`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primaryBlue};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue3};
    color: ${(props) => props.theme.colors.blue4};
  }
`;

const disabledStyles = css`
  color: #a8d4fe;
  cursor: default;
`;

const getButtonStyles = (disabled: boolean) => {
  return disabled ? disabledStyles : defaultStyles;
};

export const Wrapper = styled.div`
  position: relative;
`;

export const SplitButtonContainer = styled.div<{ disabled: boolean }>`
  height: 24px;
  min-width: 136px;
  max-width: fit-content;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  align-items: center;
  padding-inline-start: 12px;
  background-color: ${(props) => props.theme.colors.lightBlue2};

  ${(props) => getButtonStyles(props.disabled)}
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const IconContainer = styled.div<{ disabled: boolean }>`
  height: 24px;
  width: 24px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.lightBlue2
      : props.theme.colors.lightBlue3};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.colors.lightBlue2
        : props.theme.colors.blue2};
  }
`;

export const DropDownIcon = styled.img`
  height: 8px;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 24;
  margin-top: 4px;
  min-width: 168px;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0 12px 12px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: ${(props) => `solid 1px ${props.theme.colors.lightBlue3}`};
`;

export const ModalItem = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.primaryBlue};
  padding-top: 12px;
  cursor: pointer;
`;
