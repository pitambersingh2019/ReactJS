import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
`;

export const WrapperScroll = styled.div`
  height: calc(100% - 30px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;
