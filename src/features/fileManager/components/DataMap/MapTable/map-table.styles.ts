import styled from "styled-components";

export const MapTableContainer = styled.div<{ fadeOut: boolean }>`
  margin-top: 24px;
  height: 70%;
  opacity: ${(props) => (props.fadeOut ? "0.1" : "1")};
`;

export const WrapperScroll = styled.div`
  height: calc(5 * 64px);

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
