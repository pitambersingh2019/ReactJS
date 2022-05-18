import styled from "styled-components";

export const DashboardViewContainer = styled.div`
  width: calc(492px + 24px + 244px);
  margin-left: -24px; //thus left and right spaces will be equal

  @media (min-width: 1366px) {
    width: calc(720px + 24px + 264px);
  }

  @media (min-width: 1920px) {
    width: calc(492px + 24px + 244px + 56px + 492px + 24px + 244px);
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DashboardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-end: 16px;
`;

export const CloseIcon = styled.img`
  height: 18px;
  cursor: pointer;
  position: absolute;
  top: 56px;
  right: 16px;
`;

export const ChartsContent = styled.div<{ isProductionFloor: boolean }>`
  display: flex;
  flex-wrap: wrap;
  max-height: ${(props) =>
    `calc(100vh - 56px - 56px - 30px - 80px - 36px - ${
      props.isProductionFloor ? "145px" : "0px"
    })`};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }

  & > {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
`;

//to be able to scroll to OK button on the time range picker on the small screens
export const Wrapper = styled.div`
  min-height: calc(100vh - 40px - 30px);
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
