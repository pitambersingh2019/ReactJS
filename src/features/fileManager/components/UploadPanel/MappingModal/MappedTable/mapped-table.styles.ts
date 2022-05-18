import styled from "styled-components";

export const MappedTableContainer = styled.div`
  margin-top: 24px;
`;

export const WrapperScroll = styled.div`
  height: calc(6 * 64px + 20px);

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
`;
