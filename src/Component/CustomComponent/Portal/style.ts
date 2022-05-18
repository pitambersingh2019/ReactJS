import styled from "styled-components";

export const WrapperBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 1036px;
  height: 91%;
  background-color: white;
  border-radius: 5px;
  @media (max-width: 1366px) {
    width: 896px;
    height: 88%;
  }
  @media (max-width: 1024px) {
    width: 86%;
    height: 83%;
  }
`;

export const ChildrenWrapper = styled.div`
  height: calc(100% - 57px);
`;
