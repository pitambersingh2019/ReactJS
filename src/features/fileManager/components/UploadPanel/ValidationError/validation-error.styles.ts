import styled, { css } from "styled-components";

export const ValidationErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

export const CloseIcon = styled.img`
  height: 28px;
  position: absolute;
  top: -20px;
  ${(props) => (props.theme.dir === "rtl" ? `left: -12px;` : `right: -12px;`)}
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

export const WarningIcon = styled.img`
  height: 56px;
`;

const baseTextStyle = css`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
`;

export const ErrorMessage = styled.div`
  ${baseTextStyle}
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const Text = styled.div`
  ${baseTextStyle}
  color: ${(props) => props.theme.colors.gray2};
  text-align: center;
`;

export const Details = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.purple};
  position: absolute;
  bottom: 0px;
  ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
  cursor: pointer;
`;
