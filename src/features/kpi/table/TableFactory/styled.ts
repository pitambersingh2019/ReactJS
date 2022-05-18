import styled from "styled-components";

export const FactoryWrapper = styled.div`
  max-height: calc(100% - 90px);
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
