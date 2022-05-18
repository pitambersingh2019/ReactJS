import styled, { css } from "styled-components";

interface SSkeletonLine {
  height: number;
  width: number;
}

export const SSkeletonLine = styled.div.attrs<SSkeletonLine>(
  ({ height, width }) => ({
    style: {
      height: height,
      width: width,
    },
  })
)`
  display: inline-block;
  border-radius: 4px;
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  background: ${() =>
    css`linear-gradient(-90deg, #f6f7fc 0%, #e3e6f6 50%, #f6f7fc 100%)`};
  background-size: 400% 400%;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  border: solid 1px #e3e3e3;
  background-color: #ffffff;
  padding: 2px;
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;

export const SkeletonColWrapper = styled.div<{
  width: number;
  height: number;
  justifyElemnts: boolean;
}>`
  display: flex;
  align-items: ${(p) => (p.justifyElemnts ? "center" : "start")};
  flex-direction: column;
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  gap: 24px;
`;
