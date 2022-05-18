import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 20px;
`;

export const RequiredText = styled.p`
  color: #050709;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const UpdatedInfoText = styled.p`
  color: #404d61;
  font-size: 14px;
  margin-bottom: 0;
`;

export const UpdatedIcon = styled.img`
  height: 14px;
  margin-right: 4px;
`;

export const UpdateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinningIcon = styled.img`
  height: 16px;
  margin-right: 5px;
  animation: ${rotate} infinite 2s linear;
`;
