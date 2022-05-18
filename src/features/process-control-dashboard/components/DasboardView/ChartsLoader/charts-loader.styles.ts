import styled, { keyframes } from "styled-components";

const fillAnim = keyframes`
  0% {
    fill: #F7F8FC;
  }
  50% {
    fill: rgb(237, 235, 233);
  }
  100% {
    fill: #F7F8FC;
  }
`;

const strokeAnim = keyframes`
  0% {
    stroke: #F7F8FC;
  }
  50% {
    stroke: rgb(237, 235, 233);
  }
  100% {
    stroke: #F7F8FC;
  }
`;

export const Wrapper = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #aad5fd;
  background-color: #fff;
  padding: 8px;
  margin-top: 16px;

  & > svg {
    .st0 {
      fill: rgb(237, 235, 233);
      animation: ${fillAnim} 1s infinite linear;
      animation-fill-mode: forwards;
    }
    .st1 {
      fill: none;
      stroke: #f7f8fc;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: bevel;
      animation: ${strokeAnim} 1s infinite linear;
      animation-fill-mode: forwards;
    }
  }
`;
