import styled, { css } from "styled-components";

export const AlreadyMappedWarningContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WarningIcon = styled.img`
  height: 62px;
`;

const contentStyles = css`
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
`;

export const ContentBold = styled.div`
  ${contentStyles}
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const ContentNotice = styled.div`
  ${contentStyles}
  font-weight: normal;
  color: ${(props) => props.theme.colors.gray2};
`;
