import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 80px);
  background-color: white;
  width: 100%;
`;

export const WrapperCenter = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 1176px;
  @media (max-width: 1400px) {
    width: 944px;
  }
  @media (max-width: 1200px) {
    width: calc(100% - 48px);
    padding: 0 5px;
  }
`;
