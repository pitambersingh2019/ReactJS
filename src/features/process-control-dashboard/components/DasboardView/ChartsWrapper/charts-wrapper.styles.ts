import styled from "styled-components";

export const ChartsContainer = styled.div`
  margin-top: 24px;
  display: flex;
  height: 276px;
  gap: 24px;
`;

export const LargeContainer = styled.div`
  width: 492px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #aad5fd;
  background-color: #fff;
  padding: 8px;

  @media (min-width: 1366px) {
    width: 720px;
  }

  @media (min-width: 1920px) {
    width: 492px;
  }
`;

export const SmallContainer = styled.div`
  width: 244px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #aad5fd;
  background-color: #fff;
  padding: 8px;

  @media (min-width: 1366px) {
    width: 264px;
  }

  @media (min-width: 1920px) {
    width: 244px;
  }
`;
