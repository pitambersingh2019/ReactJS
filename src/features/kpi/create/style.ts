import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  max-width: 756px;
  margin: 0 auto;
  padding-top: 16px;
`;
export const WrapperContent = styled.div`
  height: calc(100% - 188px);
  margin-top: 30px;

  @media (min-width: 1920px) {
    height: calc(100% - 196px);
  }
`;
