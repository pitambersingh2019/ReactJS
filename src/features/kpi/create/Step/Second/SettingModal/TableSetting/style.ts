import styled from "styled-components";

export const WrapperScroll = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;
  margin-top: 16px;
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

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  border: solid 1px #e3e3e3;
`;
