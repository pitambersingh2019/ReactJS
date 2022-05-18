import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 77px);
`;

export const DragWrapper = styled.div`
  position: fixed;
  background-color: white;
  z-index: 99;
  left: 0;
  top: 0;
`;

export const FactoryWrapper = styled.div`
  max-height: 500px;
  padding: 5px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
  & > div {
    margin-top: 24px;
  }
  & > div:first-child {
    margin-top: 0;
  }
`;
