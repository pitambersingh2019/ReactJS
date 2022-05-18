import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const SpinningIcon = styled.img`
  height: 16px;
  margin-right: 5px;
  animation: ${rotate} infinite 2s linear;
`;

export const Message = styled.span`
  font-size: 14px;
  color: #404d61;
`;
