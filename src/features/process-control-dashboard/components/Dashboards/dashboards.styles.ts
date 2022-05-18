import styled from "styled-components";

export const DashboardsContainer = styled.div`
  width: 784px;

  @media (min-width: 1024px) {
    width: 784px;
  }

  @media (min-width: 1366px) {
    width: 968px;
  }

  @media (min-width: 1920px) {
    width: 1200px;
  }
`;

export const ContentContainer = styled.div<{ isProductionFloor: boolean }>`
  max-height: ${(props) =>
    `calc(100vh - 56px - 51px - 75px - 40px - ${
      props.isProductionFloor ? "145px" : "0px"
    })`};
  overflow: auto;
  padding-inline-end: 12px;

  & > {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
