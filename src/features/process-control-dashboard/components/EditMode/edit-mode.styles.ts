import styled from "styled-components";

export const EditModeContainer = styled.div<{ isProductionFloor: boolean }>`
  width: 100%;
  min-height: ${(props) =>
    `calc(100vh - 56px - 1px - ${props.isProductionFloor ? "145px" : "0px"})`};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 56px;
`;

export const Wrapper = styled.div<{ isProductionFloor: boolean }>`
  width: 100%;
  max-height: ${(props) =>
    `calc(100vh - 56px - 90px - 68px - 40px - 65px - ${
      props.isProductionFloor ? "145px" : "0px"
    })`};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

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
