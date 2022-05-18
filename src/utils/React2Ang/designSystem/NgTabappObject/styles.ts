import styled from "styled-components";

export const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${(p) => p.height};
  max-width: 100vw;

  /* body.mini-navbar {
    max-width: calc(100vw);
  } */

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TabWrapper = styled.div`
  overflow-y: auto;
  /* padding: 24px 24px 0 24px; */
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.38);
  }
`;
