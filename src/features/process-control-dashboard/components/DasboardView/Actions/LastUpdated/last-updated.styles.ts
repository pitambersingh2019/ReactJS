import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LastUpdatedContainer = styled.div`
  margin-inline-start: 16px;
  display: flex;
  align-items: center;
`;

const animate = (isLoading: boolean) => {
  if (isLoading) {
    return css`
      animation: ${rotate} infinite 2s linear;
    `;
  }
};

export const RefreshIcon = styled.img<{ isLoading: boolean }>`
  height: 16px;
  cursor: pointer;
  ${(props) => animate(props.isLoading)}
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray1};
  margin-inline-start: 8px;
`;
